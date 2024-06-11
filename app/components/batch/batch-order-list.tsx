import React, {FC} from "react";
import {BatchOrderItem} from "@/components/batch/batch-order-item";
import {Batch} from "@/types";
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    currentBatch: Batch;
}

export const BatchOrderList:FC<Props> = ({currentBatch}) => {
    return (
        <div className="relative">
            <AnimatePresence >
                {currentBatch && currentBatch.orders.map((order, index) => (
                    <motion.div
                        key={order.id} // Assuming order has a unique `id` property
                        initial={{ opacity: 0, x: -100, position: 'absolute', top: 0 }}
                        animate={{ opacity: 1, x: 0, position: 'relative' }}
                        exit={{ opacity: 0, x: 100, position: 'absolute', top: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <BatchOrderItem key={order.id} batchOrderItem={order} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>

    )
}
