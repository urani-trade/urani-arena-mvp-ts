
import React, {FC} from "react";
import {SolutionItem} from "@/components/solutions/solution-item";
import {Batch, ISolution} from "@/types";


interface Props {
    currentBatch:Batch;
}

export const SolutionsList:FC<Props> = ({currentBatch}) => {
    return (
        <>
            {currentBatch.solutions.map((solution: ISolution, index:number) =>
                <SolutionItem key={index} solution={solution} index={index} />
            )}
        </>
    )
}
