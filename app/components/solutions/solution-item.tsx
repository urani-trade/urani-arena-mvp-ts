import React, {FC} from "react";
import {ISolution} from "@/types";

interface Props {
    solution: ISolution;
    index: number
}

export const SolutionItem:FC<Props> = ({solution, index}) => {
    return (
        <div  className="flex items-center justify-between mb-1 p-1 bg-gray-700 rounded-lg">
            <div className="flex items-center">
                <div className="font-semibold text-white mr-2">{(index + 1).toString()}</div>
                <img src={solution.agentImage} alt={solution.agentName} className="w-8 h-8 mr-2 rounded-full"/>
                <div className="font-semibold text-white">{solution.agentName}</div>
            </div>
            <div className="relative flex items-center justify-center w-32">
                {solution.route.map((venue, venueIndex) => (
                    <img
                        key={venueIndex}
                        src={venue.venueImage}
                        alt={venue.venueName}
                        className="w-6 h-6 rounded-full absolute"
                        style={{ left: `${venueIndex * 20}px` }}
                    />
                ))}
            </div>
            <div className="font-semibold text-white">{solution.solutionScore}</div>
        </div>
    )
}
