"use client";

import React, { useState } from 'react';
import { TrophyIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';

interface Player {
  name: string;
  batches: number;
  volume: number;
  surplus: number;
}

const leaderboardData: Player[] = [
  { name: 'Alice', batches: 150, volume: 3000, surplus: 500 },
  { name: 'Bob', batches: 140, volume: 3200, surplus: 400 },
  { name: 'Charlie', batches: 130, volume: 3100, surplus: 450 },
  { name: 'Dave', batches: 120, volume: 2900, surplus: 420 },
  { name: 'Eve', batches: 110, volume: 2800, surplus: 380 },
];

const season = "Season 1";

const Leaderboard: React.FC = () => {
  const [sortKey, setSortKey] = useState<'batches' | 'volume' | 'surplus'>('batches');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedData = [...leaderboardData].sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;
    if (a[sortKey] < b[sortKey]) return -1 * order;
    if (a[sortKey] > b[sortKey]) return 1 * order;
    return 0;
  });

  const handleSort = (key: 'batches' | 'volume' | 'surplus') => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <div className="mt-10 flex flex-col items-center justify-center p-2 sm:p-4 space-y-4 sm:space-y-6">
      <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-4 text-center text-white">
        {season} Leaderboard
      </h1>
      <div className="flex flex-col lg:flex-row w-full max-w-6xl space-x-0 lg:space-x-6 space-y-4 sm:space-y-6 lg:space-y-0">
        <div className="flex-1 bg-gradient-to-br from-zinc-900 via-zinc-910 to-black shadow-2xl rounded-lg p-2 sm:p-4 md:p-6 border border-gray-600 dark:border-gray-700">
          <h1 className="text-lg sm:text-xl md:text-3xl font-bold mb-4 sm:mb-6 text-center text-white">
            Top Operators
          </h1>
          <table className="w-full text-left text-white text-xs sm:text-sm md:text-base">
            <thead className="rounded-lg">
              <tr className="bg-gradient-radial from-zinc-800 to-zinc-850 rounded-lg">
                <th className="px-1 sm:px-2 md:px-4 py-1 sm:py-2 border-b-2 border-gray-800 text-sm md:text-lg font-semibold">Name</th>
                <th
                  className="px-1 sm:px-2 md:px-4 py-1 sm:py-2 border-b-2 border-gray-800 text-sm md:text-lg font-semibold cursor-pointer"
                  onClick={() => handleSort('batches')}
                >
                  <div className="flex items-center">
                    Batches
                    <span className="ml-1 w-3 sm:w-4 h-3 sm:h-4">
                      {sortKey === 'batches' && (
                        sortOrder === 'asc' ? (
                          <ChevronUpIcon className="w-3 sm:w-4 h-3 sm:h-4" />
                        ) : (
                          <ChevronDownIcon className="w-3 sm:w-4 h-3 sm:h-4" />
                        )
                      )}
                    </span>
                  </div>
                </th>
                <th
                  className="px-1 sm:px-2 md:px-4 py-1 sm:py-2 border-b-2 border-gray-800 text-sm md:text-lg font-semibold cursor-pointer"
                  onClick={() => handleSort('volume')}
                >
                  <div className="flex items-center">
                    Volume
                    <span className="ml-1 w-3 sm:w-4 h-3 sm:h-4">
                      {sortKey === 'volume' && (
                        sortOrder === 'asc' ? (
                          <ChevronUpIcon className="w-3 sm:w-4 h-3 sm:h-4" />
                        ) : (
                          <ChevronDownIcon className="w-3 sm:w-4 h-3 sm:h-4" />
                        )
                      )}
                    </span>
                  </div>
                </th>
                <th
                  className="px-1 sm:px-2 md:px-4 py-1 sm:py-2 border-b-2 border-gray-800 text-sm md:text-lg font-semibold cursor-pointer"
                  onClick={() => handleSort('surplus')}
                >
                  <div className="flex items-center">
                    Surplus
                    <span className="ml-1 w-3 sm:w-4 h-3 sm:h-4">
                      {sortKey === 'surplus' && (
                        sortOrder === 'asc' ? (
                          <ChevronUpIcon className="w-3 sm:w-4 h-3 sm:h-4" />
                        ) : (
                          <ChevronDownIcon className="w-3 sm:w-4 h-3 sm:h-4" />
                        )
                      )}
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((player, index) => (
                <tr
                  key={player.name}
                  className={`hover:bg-gray-700 transition-colors duration-200 ${
                    index === 0 ? 'first:rounded-tl-lg first:rounded-tr-lg' : ''
                  } ${
                    index === sortedData.length - 1 ? 'last:rounded-bl-lg last:rounded-br-lg' : ''
                  }`}
                >
                  <td className={`px-1 sm:px-2 md:px-4 py-1 sm:py-2 ${index !== sortedData.length - 1 ? 'border-b border-gray-800' : ''}`}>
                    {player.name}
                  </td>
                  <td className={`px-1 sm:px-2 md:px-4 py-1 sm:py-2 ${index !== sortedData.length - 1 ? 'border-b border-gray-800' : ''}`}>
                    {player.batches}
                  </td>
                  <td className={`px-1 sm:px-2 md:px-4 py-1 sm:py-2 ${index !== sortedData.length - 1 ? 'border-b border-gray-800' : ''}`}>
                    ${player.volume.toLocaleString()}
                  </td>
                  <td className={`px-1 sm:px-2 md:px-4 py-1 sm:py-2 ${index !== sortedData.length - 1 ? 'border-b border-gray-800' : ''}`}>
                    ${player.surplus.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full lg:w-1/3 bg-gradient-to-br from-zinc-900 via-zinc-910 to-black shadow-2xl rounded-lg p-2 sm:p-4 md:p-6 border border-gray-600 dark:border-gray-700">
          <h1 className="text-lg sm:text-xl md:text-3xl font-bold mb-4 sm:mb-6 text-center text-white">
            Highlights
          </h1>
          <div className="text-white space-y-2 sm:space-y-4">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <TrophyIcon className="w-3 sm:w-4 md:w-6 h-3 sm:h-4 md:h-6 text-yellow-400" />
              <span className="text-xs sm:text-sm md:text-base">Winner of Most Batches Filled: <strong>Alice</strong></span>
            </div>
            <hr className="border-gray-700" />
            <div className="flex items-center space-x-1 sm:space-x-2">
              <TrophyIcon className="w-3 sm:w-4 md:w-6 h-3 sm:h-4 md:h-6 text-yellow-400" />
              <span className="text-xs sm:text-sm md:text-base">Winner of Most Volume Filled: <strong>Bob</strong></span>
            </div>
            <hr className="border-gray-700" />
            <div className="flex items-center space-x-1 sm:space-x-2">
              <TrophyIcon className="w-3 sm:w-4 md:w-6 h-3 sm:h-4 md:h-6 text-yellow-400" />
              <span className="text-xs sm:text-sm md:text-base">Winner of Most Surplus Given: <strong>Charlie</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
