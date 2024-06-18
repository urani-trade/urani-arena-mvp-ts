import React, {FC, useEffect, useMemo, useState} from "react";
import 'swiper/css';
import {Swiper, SwiperSlide} from 'swiper/react';
import {leaderboardData} from "@/components/leaderboard/hardcoded-leaderboard";
import {useGetLeaders} from "@/components/leaderboard/useGetLeaders";
import {LeaderBoardColumns, Player} from "@/components/leaderboard/types";
import './styles.css';
import {Autoplay, Parallax} from 'swiper/modules';
const season = "Season 1";

const headers = [
    {label: '', key: 'indexNum'},
    { label: 'Name', key: 'name', },
    { label: 'Batches', key: 'batches', },
    { label: 'Volume', key: 'volume', },
    { label: 'Surplus', key: 'surplus',  },
    { label: 'Profit', key: 'profit',  },
    { label: 'Cost', key: 'cost',  },
];

export const LeaderShipBoard:FC = () => {
    const [sortKey, setSortKey] = useState<LeaderBoardColumns>('batches');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const [boardType,setBoardType] = useState<'agents' | 'transactions'>('agents');

    const [leaderData,setLeaderData] = useState<Player[]>([] as Player[]);

    useEffect(() => {
        if(leaderboardData?.length) {
            setLeaderData(leaderboardData);
        }
    }, [leaderboardData]);

    const sortedData = useMemo(()=>{
           if (leaderData?.length == 0) return null;
           else return [...leaderData].sort((a, b) => {
                const order = sortOrder === 'asc' ? 1 : -1;
                if (a[sortKey] < b[sortKey]) return -1 * order;
                if (a[sortKey] > b[sortKey]) return 1 * order;
                return 0;
            })
    },[leaderData, sortKey, sortOrder]);

    const handleSort = (key: LeaderBoardColumns) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };

    const topPlayers = useGetLeaders(leaderData);

    const markTopPlayersInTable = (id:string) => {
        if(topPlayers){
            if(id == topPlayers[0].player.id) return 'batches';
            if(id == topPlayers[1].player.id) return 'volume';
            if(id == topPlayers[2].player.id) return 'surplus';
        }
        return '';
    }

    return (
        <div className="mt-10 max_lg:mt-6 max_md:mt-0 flex flex-col p-2 max_lg:p-0 max_sm:p-1">
            <h2 className="text-white text-center opacity-70 mb-6 max_lg:mb-4">
                {season}
            </h2>
            <h1 className="max-md:text-2xl text-center max_sm:text-xl text-4xl font-bold mb-6 max_lg:mb-4 text-white">
                Leaderboard
            </h1>
            <div className="flex flex-col w-full space-y-4 ">
                {
                    topPlayers && topPlayers?.length > 0 &&
                    <div className="w-full flex justify-between space-x-3 mx-auto max_lg:space-y-0">
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={20}
                            loop={true}
                            speed={600}
                            parallax={true}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: true,
                            }}
                            modules={[Parallax, Autoplay]}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                },
                                480: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 3,
                                }
                            }}
                        >
                            {
                                topPlayers?.map((item, index) =>
                                    <SwiperSlide key={item.player.id}>
                                        <div className={`w-full flex items-center bg-custom-gradient p-4 max_lg:p-3 rounded-lg shadow-md relative
                                            ${index !== topPlayers?.length-1 ? '':''}
                                    `}>
                                            <div className="absolute top-0 right-4  w-17 h-17  max_lg:w-14  max_lg:h-14">
                                                <img src="/medal-leader.svg" alt="medal" className=" w-17 h-17  max_lg:w-14  max_lg:h-14"/>
                                            </div>
                                            <div className="">
                                                <div className="bg-backgroundPage px-2 py-1 mb-3 w-fit rounded-lg">
                                                    <span className="text-sm max_lg:text-xs text-white">{item.type}: {(index == 1 || index == 2) && '$'}{item.player.value}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 mr-2">
                                                        <img src={item.player.avatar || "/avatar-mockup.svg"} alt="user" className="w-10 h-10  max_lg:w-8  max_lg:h-8 rounded-full border-backgroundPage border-2"/>
                                                    </div>
                                                    <span className="text-2xl  max_lg:text-lg font-bold">{item.player.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            }
                        </Swiper>

                    </div>
                }
                <div className="flex-1 rounded-lg max_md:py-2 sm:py-4 py-6">

                    <div className="w-full flex justify-start mb-3">
                        <div onClick={() => {if(boardType !== 'agents') setBoardType('agents') }}
                            className={`mr-4 hover:text-white duration-300 ${boardType !== 'agents' && 'cursor-pointer'}`}
                        >
                            <span className={`block mb-1 text-white text-sm max_lg:text-xs  ${boardType !== 'agents' && 'opacity-70'}`}>Top Agents</span>
                            <span className={`block w-full h-1 ${boardType == 'agents' ? 'bg-white' : 'bg-transparent'}`}></span>
                        </div>
                        <div onClick={() => {if(boardType !== 'transactions') setBoardType('transactions') }}
                             className={`hover:text-white duration-300 ${boardType !== 'transactions' && 'cursor-pointer'}`}
                        >
                            <span className={`block mb-1 text-white text-sm max_lg:text-xs ${boardType !== 'transactions' && 'opacity-70'}`}>Top Transactions</span>
                            <span className={`block w-full h-1 ${boardType == 'transactions' ? 'bg-white' : 'bg-transparent'}`}></span>
                        </div>
                    </div>
                    {
                        sortedData && sortedData?.length > 0 &&
                        <div className="max_md:overflow-x-scroll">
                            <table className="w-full text-left text-white text-sm  max_md:text-xs max_md:text-base border-separate border-spacing-y-2">
                                <thead className="">
                                <tr className="">
                                    {headers.map((header) => (
                                        <th key={header.key} className="">
                                            <div className="flex w-fit cursor-pointer mr-6"
                                                 onClick={() => handleSort(header.key as LeaderBoardColumns)}
                                            >
                                            <span className={`py-2 pl-2 pr-1  text-white  ${sortKey !== header.key && 'opacity-70'} font-semi-bold`}>
                                                {header.label}
                                            </span>
                                                <div className="flex items-center">
                                               <span className="w-6 h-6">
                                                  {sortKey === header.key && (
                                                      sortOrder === 'asc' ? (
                                                          <img src="/sort-min.svg" alt="min" className="w-6 h-6" />
                                                      ) : (
                                                          <img src="/sort-max.svg" alt="max" className="w-6 h-6" />
                                                      )
                                                  )}
                                                </span>
                                                </div>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody className="space-y-2">
                                { sortedData.map((player, index) => (
                                    <tr
                                        key={player.id}
                                        className={`bg-brand ${
                                            index === 0 ? 'first:rounded-t-lg' : ''
                                        } ${index === sortedData.length - 1 ? 'last:rounded-b-lg' : ''}`}
                                    >
                                        <td className="px-3">
                                            {markTopPlayersInTable(player.id) == 'batches' &&
                                                <img className="w-8 h-8 max_md:w-6 max_md:h-6"
                                                     src='/most-batches.svg' alt=''
                                                />}
                                            {markTopPlayersInTable(player.id) == 'volume' &&
                                                <img className="w-8 h-8 max_md:w-6 max_md:h-6"
                                                     src='/most-volume.svg' alt=''
                                                />}
                                            {markTopPlayersInTable(player.id) == 'surplus' &&
                                                <img className="w-8 h-8 max_md:w-6 max_md:h-6"
                                                     src='/most-surplus.svg' alt=''
                                                />}
                                            {!['batches', 'volume', 'surplus'].includes(markTopPlayersInTable(player.id)) && (
                                                <span className="text-sm md:text-xs pl-1">#{index + 1}</span>
                                            )}
                                        </td>
                                        <td className={`px-1 py-2 flex items-center`}>
                                            <div className="w-8 h-8 mr-2 max_md:w-6 max_md:h-6">
                                                <img className="w-8 h-8 max_md:w-6 max_md:h-6"
                                                     src={player.avatar || '/avatar-mockup.svg'} alt=''
                                                />
                                            </div>
                                            {player.name}
                                        </td>
                                        <td className="px-1  py-1 ">
                                            {player.batches}
                                        </td>
                                        <td className="px-1 py-1 ">
                                            ${player.volume.toLocaleString()}
                                        </td>
                                        <td className="px-1  py-1 ">
                                            ${player.surplus.toLocaleString()}
                                        </td>
                                        <td className="px-1  py-1 ">
                                            ${player.profit.toLocaleString()}
                                        </td>
                                        <td className="px-1  py-1 ">
                                            ${player.cost.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
