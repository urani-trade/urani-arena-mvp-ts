import React, {FC} from "react";
import {BatchOrderItem} from "@/components/batch/batch-order-item";
import {Batch} from "@/types";

interface Props {
    currentBatch: Batch;
}

export const BatchOrderList:FC<Props> = ({currentBatch}) => {
    return (
        <>
            {currentBatch && currentBatch.orders.map((order, index) => (
                    <BatchOrderItem key={index} batchOrderItem={order} />
             ))}
        </>
    )
}
