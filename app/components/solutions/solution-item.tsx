import React, {FC, useEffect, useState} from "react";
import {ISolution} from "@/types";

interface Props {
    solution: ISolution;
    index: number;
    isSelected: boolean;
    onSelect: any;
}

interface IUniqueArray {
    name: string,
    image: string
}

export const SolutionItem:FC<Props> = ({solution, index, isSelected, onSelect}) => {

    const handleClick = () => {
        onSelect(solution.id);
    };
    const [uniqueArrayImages, setUniqueArrayImages] = useState<IUniqueArray[]>([]);

    useEffect(() => {
        const uniqueItems: any = {};
        const uniqueArray: IUniqueArray[] = [];
        solution.route.forEach(item => {
            if (!uniqueItems[item.srcName]) {
                uniqueItems[item.srcName] = {
                    name: item.srcName,
                    image: item.srcImage
                };
                uniqueArray.push(uniqueItems[item.srcName]);
            }

            if (!uniqueItems[item.dstName]) {
                uniqueItems[item.dstName] = {
                    name: item.dstName,
                    image: item.dstImage
                };
                uniqueArray.push(uniqueItems[item.dstName]);
            }
        });
        setUniqueArrayImages(uniqueArray);
    }, [solution]);


    return (
        <div  className={`flex items-center justify-between border-2 mb-1 p-1 bg-secondBrand rounded-lg
        ${isSelected ? 'border-white' : 'border-secondBrand'}
        `}
            onClick={handleClick}
        >
            <div className="flex items-center">
                <div className="font-semibold text-white mr-2">{(index + 1).toString()}</div>
                <img src={solution.agent.image} alt={solution.agent.name} className="w-8 h-8 mr-2 rounded-full"/>
                <div className="font-semibold text-white">{solution.agent.name}</div>
            </div>
            <div className="relative flex items-center justify-center w-32">
                {uniqueArrayImages?.length > 0 && uniqueArrayImages.slice(0, 5).map((venue, venueIndex) => (
                    <img
                        key={venueIndex}
                        src={venue.image}
                        alt={venue.name}
                        className="w-6 h-6 rounded-full absolute"
                        style={{ left: `${venueIndex * 20}px` }}
                    />
                ))}
                {(uniqueArrayImages?.length - 5) > 0 && (
                    <div
                        className="w-6 h-6 rounded-full absolute flex items-center justify-center text-xs bg-backgroundPage text-white"
                        style={{ left: `${5 * 20}px` }}
                    >
                        +{uniqueArrayImages?.length - 5}
                    </div>
                )}
            </div>
            <div className="font-semibold text-white">{solution.score}</div>
        </div>
    )
}
