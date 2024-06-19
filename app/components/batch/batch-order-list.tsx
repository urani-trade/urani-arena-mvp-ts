import React, {FC} from "react";
import {IBatch, ITokenMetadata} from "@/types";
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    currentBatch: IBatch;
    tokenMetadata: ITokenMetadata
}
const transitionConfig = {
    duration: 0.6,
    ease: [0.43, 0.13, 0.23, 0.66],
};

export const BatchOrderList:FC<Props> = ({currentBatch, tokenMetadata}) => {
    return (
        <div className="relative">
            <AnimatePresence >
                {currentBatch && currentBatch.orders.map((order, index) => (
                    <motion.div
                        key={order.intentId}
                        initial={{ opacity: 0, x: -100, position: 'absolute', top: index * 20 }}
                        animate={{ opacity: 1, x: 0, position: 'relative', top: index * 4, }}
                        exit={{ opacity: 0, x: 100, position: 'absolute', top: index * 20, }}
                        transition={transitionConfig}
                    >
                        <div key={order.intentId} className="flex items-center justify-between mb-1 p-1 bg-secondBrand rounded-lg shadow-md">
                            <div className="flex items-center w-1/2">
                                <img src={tokenMetadata[order.srcToken].icon} alt={order.srcToken} className="w-8 h-8 mr-2 rounded-full"/>
                                <div>
                                    <div className="text-gray-400 text-sm">
                                        {(order.srcAmount / Math.pow(10, tokenMetadata[order.srcToken].decimals)).toFixed(tokenMetadata[order.srcToken].decimals)}
                                    </div>
                                    <div className="font-semibold text-white text-sm">{tokenMetadata[order.srcToken].symbol}</div>
                                </div>
                            </div>
                            <div className="w-16 flex justify-center text-gray-400">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                </svg>
                            </div>
                            <div className="flex items-center w-1/2 justify-end">
                                <div className="mr-2 text-right">
                                    <div className="font-semibold text-white text-sm">{tokenMetadata[order.dstToken].symbol}</div>
                                </div>
                                <img src={tokenMetadata[order.dstToken].icon} alt={order.dstToken} className="w-8 h-8 rounded-full"/>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>

    )
}
