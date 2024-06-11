import {IBatchOrder, Order} from "@/types";
import React, {FC} from "react";


interface Props {
    batchOrderItem: IBatchOrder;
}

export const BatchOrderItem:FC<Props> = ({batchOrderItem}) => {

    return (
        <div className="flex items-center justify-between mb-1 p-1 bg-secondBrand rounded-lg shadow-md">
            <div className="flex items-center w-1/2">
                <img src={batchOrderItem.srcToken.image} alt={batchOrderItem.srcToken.name} className="w-8 h-8 mr-2 rounded-full"/>
                <div>
                    <div className="text-gray-400 text-sm">{batchOrderItem.srcToken.amount}</div>
                    <div className="font-semibold text-white text-sm">{batchOrderItem.srcToken.name}</div>
                </div>
            </div>
            <div className="w-16 flex justify-center text-gray-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
            </div>
            <div className="flex items-center w-1/2 justify-end">
                <div className="mr-2 text-right">
                    <div className="text-gray-400 text-sm">{batchOrderItem.targetToken.amount}</div>
                    <div className="font-semibold text-white text-sm">{batchOrderItem.targetToken.name}</div>
                </div>
                <img src={batchOrderItem.targetToken.image} alt={batchOrderItem.targetToken.name} className="w-8 h-8 rounded-full"/>
            </div>
        </div>
    )
}
