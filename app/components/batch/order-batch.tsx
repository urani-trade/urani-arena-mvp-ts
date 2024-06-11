'use client';

import React, {FC, useEffect, useRef, useState} from 'react';
import {batchData} from "@/components/batch/batches-hardcode";
import {BatchOrderList} from "@/components/batch/batch-order-list";
import {SolutionsList} from "@/components/solutions/solutions-list";
import {Batch} from "@/types";

const TIME_AUTO_CHANGE: number = 4000; // 4000 for develop and testing ( 40000 for prod)

interface Props {
    batch: any;
    selectedSolutionId: string;
    handleSelectSolution: any;
}

const OrderBatch:FC<Props> = ({batch, handleSelectSolution, selectedSolutionId}) => {
    const [id,setId] = useState<number>(0);
    const [currentBatch,setCurrentBatch] = useState<Batch | null>(null);

    const [isRunning, setIsRunning] = useState<boolean>(false);

    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number>(0);
    const remainingTimeRef = useRef<number>(TIME_AUTO_CHANGE);


    useEffect(() => {
        if (!isRunning || id >= batchData.length) return;

        setCurrentBatch(batchData[id]);

        startTimeRef.current = Date.now();
        timerRef.current = setTimeout(() => {
            setElapsedTime(0);
            if (id < batchData.length - 1) {
                setId((prevId) => prevId + 1);
                remainingTimeRef.current = TIME_AUTO_CHANGE;
            } else {
                setIsRunning(false);
            }
        }, remainingTimeRef.current);

        return () => {
            clearTimeout(timerRef.current as NodeJS.Timeout);
        };
    }, [isRunning, id, batchData]);

    useEffect(() => {
        if (batchData.length > 0) {
            setCurrentBatch(batchData[0]);
            startTimer();
        }
    }, [batchData]);

    const startTimer = () => {
        if (!isRunning) {
            setIsRunning(true);
        }
    };

    const pauseTimer = () => {
        if (isRunning) {
            setIsRunning(false);
            clearTimeout(timerRef.current as NodeJS.Timeout);
            const timePassed = Date.now() - startTimeRef.current;
            remainingTimeRef.current -= timePassed;
        }
    };

    const resetTimer = () => {
        setIsRunning(false);
        setId(0);
        setElapsedTime(0);
        remainingTimeRef.current = TIME_AUTO_CHANGE;
        setCurrentBatch(batchData[0] || null);
        clearTimeout(timerRef.current as NodeJS.Timeout);
    };

    const prevBatch = () => {
        if (id > 0) {
            setId((prevId) => prevId - 1);
            setCurrentBatch(batchData[id - 1]);
        }
    };

    const nextBatch = () => {
        if (id < batchData.length - 1) {
            setId((prevId) => prevId + 1);
            setCurrentBatch(batchData[id + 1]);
        }
    };

    const changeCurrentBatch = (value:string) => {
        //at this place we have logic to get batch by number (need query)
    }

    return (
        <div>
            <div className="container flex justify-between items-center bg-transparent mb-4 m-auto">
                <button
                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 border-white text-white transition duration-200
                          ${id === 0 ? 'bg-brandDisabled text-arrowDisabled border-brandBorderDisabled cursor-not-allowed' : 'hover:bg-brand hover:text-white'}`}
                    onClick={prevBatch}
                    disabled={id === 0}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                        ></path>
                    </svg>
                </button>
                <div className="flex">
                    <h2 className="font-semibold text-white text-center mr-3">Batch #</h2>
                    <input style={{ width: '137px' }}
                        className="bg-transparent border-2 border-secondBrand rounded-md text-white text-center"
                        value={currentBatch?.batchNumber.toString()}
                        onChange={(event) => changeCurrentBatch(event.target.value)}
                    />
                </div>
                <button
                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 border-white text-white transition duration-200
                            ${id === batchData.length - 1 ? 'bg-brandDisabled border-brandBorderDisabled text-arrowDisabled' : 'hover:bg-brand hover:text-white'}`}
                    onClick={nextBatch}
                    disabled={id === batchData.length - 1}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                        ></path>
                    </svg>
                </button>
            </div>
            {
                currentBatch &&
                <>
                    <div className="container rounded-lg mb-4">
                        <button
                            className="container flex justify-center px-4 py-2 rounded-md text-backgroundPage transition-colors duration-200 ease-in-out
                        bg-white hover:bg-hoverWhite active:bg-hoverWhite focus:outline-none focus:ring-2 focus:ring-blue-300"
                            onClick={() => isRunning ? pauseTimer() : startTimer() }
                        >
                            {isRunning ?
                                <div className="flex">
                                    <img  src="/pause.svg" className="mr-2" alt="" />
                                    Pause
                                </div>
                                :
                                <div className="flex">
                                    <img  src="/livestream.svg" className="mr-2" alt="" />
                                    Livestream
                                </div>
                            }
                        </button>
                    </div>
                    <div className="bg-brand p-4 rounded-lg shadow-lg w-96 mb-4">
                        <div className="font-semibold text-white mb-4 text-left">Orders</div>
                        <BatchOrderList currentBatch={currentBatch}/>
                    </div>

                    <div className="bg-brand p-4 rounded-lg shadow-lg w-96">
                        <div className="font-semibold text-white mb-2 text-left">Solutions</div>
                        <SolutionsList
                            currentBatch={currentBatch}
                            selectedSolutionId={selectedSolutionId}
                            handleSelectSolution={handleSelectSolution}
                        />
                    </div>
                </>
            }
        </div>
    );
};

export default OrderBatch;
