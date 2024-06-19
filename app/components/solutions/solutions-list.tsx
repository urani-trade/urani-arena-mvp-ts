
import React, {FC} from "react";
import {SolutionItem} from "@/components/solutions/solution-item";
import {IBatch, ISolution} from "@/types";
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    currentBatch: IBatch;
    selectedSolutionId: string;
    handleSelectSolution: any;
}
const transitionConfig = {
    duration: 0.6,
    ease: [0.43, 0.13, 0.23, 0.66],
};

export const SolutionsList:FC<Props> = ({currentBatch, selectedSolutionId, handleSelectSolution}) => {


    return (
        <div className="relative">
            <AnimatePresence >
                {currentBatch.solutions.map((solution: ISolution, index:number) =>
                    <motion.div
                        //need to have unique key for good animation
                        key={solution.agent.name + solution.score}
                        initial={{ opacity: 0, x: -100, position: 'absolute', top: index * 20 }}
                        animate={{ opacity: 1, x: 0, position: 'relative', top: index * 4,  }}
                        exit={{ opacity: 0, x: 100, position: 'absolute', top: index * 20,   }}
                        transition={transitionConfig}
                    >
                        <SolutionItem
                            //need to have unique key for good animation
                            key={solution.agent.name + solution.score}
                            solution={solution}
                            index={index}
                            isSelected={solution.agent.name === selectedSolutionId}
                            onSelect={handleSelectSolution}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
