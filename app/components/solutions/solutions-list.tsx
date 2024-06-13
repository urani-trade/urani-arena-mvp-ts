
import React, {FC} from "react";
import {SolutionItem} from "@/components/solutions/solution-item";
import {IBatch, ISolution} from "@/types";
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    currentBatch: IBatch;
    selectedSolutionId: string;
    handleSelectSolution: any;
}

export const SolutionsList:FC<Props> = ({currentBatch, selectedSolutionId, handleSelectSolution}) => {


    return (
        <div className="relative">
            <AnimatePresence >
                {currentBatch.solutions.map((solution: ISolution, index:number) =>
                    <motion.div
                        key={solution.id}
                        initial={{ opacity: 0, x: -100, position: 'absolute', top: 0 }}
                        animate={{ opacity: 1, x: 0, position: 'relative' }}
                        exit={{ opacity: 0, x: 100, position: 'absolute', top: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <SolutionItem
                            key={solution.id}
                            solution={solution}
                            index={index}
                            isSelected={solution.id === selectedSolutionId}
                            onSelect={handleSelectSolution}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
