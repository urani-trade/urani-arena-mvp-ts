'use client';

import React, {useEffect, useRef, useState} from 'react';
import {batchData} from "@/components/batch/batches-hardcode";
import {BatchOrderList} from "@/components/batch/batch-order-list";
import {SolutionsList} from "@/components/solutions/solutions-list";
import {Batch} from "@/types";

const TIME_AUTO_CHANGE: number = 4000; // 4000 for develop and testing ( 40000 for prod)

const OrderBatch = () => {
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


    console.log(id);


    return (
        <div>
            <div className="bg-zinc-800 p-4 rounded-lg shadow-lg w-96 mb-4 flex">
                <button
                    className="mr-4 px-4 py-2 rounded-md text-white transition-colors duration-200 ease-in-out
                        bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onClick={() => isRunning ? pauseTimer() : startTimer() }
                >
                    {isRunning ? 'Pause' : 'Go Live'}
                </button>
            </div>
            {
                currentBatch &&
                <>
                    <div className="bg-zinc-800 p-4 rounded-lg shadow-lg w-96 mb-4">
                        <div className="font-semibold text-white mb-4 text-center">Batch #{currentBatch.batchNumber}</div>
                        <BatchOrderList currentBatch={currentBatch}/>
                    </div>

                    <div className="bg-zinc-800 p-4 rounded-lg shadow-lg w-96">
                        <div className="font-semibold text-white mb-2 text-center">Solutions</div>
                        <SolutionsList currentBatch={currentBatch}/>
                    </div>
                </>
            }
        </div>
    );
};

export default OrderBatch;
