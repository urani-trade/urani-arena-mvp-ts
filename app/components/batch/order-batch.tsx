'use client';

import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {BatchOrderList} from "@/components/batch/batch-order-list";
import {SolutionsList} from "@/components/solutions/solutions-list";
import {IBatch} from "@/types";
import {debounce} from "@/utils/utils";

const TIME_AUTO_CHANGE: number = 4000; // 4000 for develop and testing ( 40000 for prod)

interface Props {
    batch: IBatch;
    selectedSolutionId: string;
    onSolutionSelected: (id: string) => void;
    fetchBatchId: (id: string) => void;
    liveStream:boolean;
    setLiveStream: (stream: boolean) => void;
}

const OrderBatch:FC<Props> = ({
  batch,
  onSolutionSelected: handleSelectSolution,
  selectedSolutionId,
  liveStream,
  setLiveStream,
  fetchBatchId,
}) => {

    const [isRunning, setIsRunning] = useState<boolean>(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const remainingTimeRef = useRef<number>(TIME_AUTO_CHANGE);
    const startTimeRef = useRef<number | null>(null); // Time when the timer was started

    const [inputValueId, setInputValueId] = useState<string>(batch?.batchId.toString());

    useEffect(() => {
        if(batch?.batchId){
            setInputValueId(batch?.batchId.toString());
        }
    }, [batch]);

    useEffect(() => {
        if (liveStream) {
            resumeTimer();
        } else {
            pauseTimer();
        }
    }, [liveStream]);

    useEffect(() => {
        if (!isRunning || !batch) return;

        startTimeRef.current = Date.now();
        timerRef.current = setTimeout(() => {
            if (isRunning) {
                const nextBatchId = (batch.batchId + 1).toString();
                fetchBatchId(nextBatchId);
                remainingTimeRef.current = TIME_AUTO_CHANGE;
            }
        }, remainingTimeRef.current);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [isRunning, batch]);

    useEffect(() => {
        if (batch) {
            startTimer();
        }
    }, [batch]);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    const startTimer = () => {
        if (!isRunning && batch) {
            setIsRunning(true);
            startTimeRef.current = Date.now();
            scheduleBatchChange();
        }
    };

    const scheduleBatchChange = () => {
        timerRef.current = setTimeout(() => {
            if (isRunning) {
                const nextBatchId = (batch.batchId + 1).toString();
                fetchBatchId(nextBatchId);
                remainingTimeRef.current = TIME_AUTO_CHANGE;
                startTimeRef.current = Date.now();
                scheduleBatchChange(); // Schedule the next batch change
            }
        }, remainingTimeRef.current);
    };

    const pauseTimer = () => {
        if (isRunning) {
            setLiveStream(false);
            setIsRunning(false);
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            if (startTimeRef.current) {
                const elapsedTime = Date.now() - startTimeRef.current;
                remainingTimeRef.current -= elapsedTime;
                startTimeRef.current = null;
            }
        }
    };

    const resumeTimer = () => {
        if (!isRunning && batch) {
            setLiveStream(true);
            setIsRunning(true);
            startTimeRef.current = Date.now();
            scheduleBatchChange();
        }
    };

    const resetTimer = () => {
        setIsRunning(false);
        remainingTimeRef.current = TIME_AUTO_CHANGE;
        startTimeRef.current = null;
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    };

    const prevBatch = () => {
        if (batch && batch.batchId > 1) {
            const prevBatchId = (batch.batchId - 1).toString();
            fetchBatchId(prevBatchId);
            resetTimer(); // Reset the timer when switching batches manually
            startTimer();
        }
    };

    const nextBatch = () => {
        if (batch) {
            const nextBatchId = (batch.batchId + 1).toString();
            fetchBatchId(nextBatchId);
            resetTimer(); // Reset the timer when switching batches manually
            startTimer();
        }
    };
    const debouncedHandleChangeBatchId = useRef(debounce(fetchBatchId, 600)).current;


    const changeCurrentBatch = useCallback((value: string) => {
        const sanitizedValue = value.replace(/[^0-9]/g, '');
        setInputValueId(sanitizedValue);
        if (sanitizedValue) {
            debouncedHandleChangeBatchId(sanitizedValue);
            resetTimer(); // Reset the timer when changing batches manually
            startTimer();
        }
    }, [debouncedHandleChangeBatchId]);

    const handleSelectSolutionWithPause = (id:string) => {
        pauseTimer();
        handleSelectSolution(id);
    }

    return (
        <div>
            <div className="container flex justify-between items-center bg-transparent mb-4 m-auto">
                <button
                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 border-white text-white transition duration-200
                          ${batch && batch.batchId === 1 ? 'bg-brandDisabled text-arrowDisabled border-brandBorderDisabled cursor-not-allowed' : 'hover:bg-brand hover:text-white'}`}
                    onClick={prevBatch}
                    disabled={batch && batch.batchId === 1}
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
                        value={inputValueId}
                        onChange={(event) => changeCurrentBatch(event.target.value)}
                    />
                </div>
                <button
                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 border-white text-white transition duration-200
                        hover:bg-brand hover:text-white`}
                    onClick={nextBatch}
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
                batch &&
                <>
                    <div className="container rounded-lg mb-4">
                        <button
                            className="container flex justify-center px-4 py-2 rounded-md text-backgroundPage transition-colors duration-200 ease-in-out
                        bg-white hover:bg-hoverWhite active:bg-hoverWhite focus:outline-none focus:ring-2 focus:ring-blue-300"
                            onClick={() => isRunning ? pauseTimer() : resumeTimer() }
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
                        <BatchOrderList currentBatch={batch}/>
                    </div>

                    <div className="bg-brand p-4 rounded-lg shadow-lg w-96">
                        <div className="font-semibold text-white mb-2 text-left">Solutions</div>
                        <SolutionsList
                            currentBatch={batch}
                            selectedSolutionId={selectedSolutionId}
                            handleSelectSolution={handleSelectSolutionWithPause}
                        />
                    </div>
                </>
            }
        </div>
    );
};

export default OrderBatch;
