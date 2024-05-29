// pages/leaderboard.tsx
import React from 'react';
import { TrophyIcon } from '@heroicons/react/20/solid';

interface Player {
  rank: number;
  name: string;
  score: number;
}

const leaderboardData: Player[] = [
  { rank: 1, name: 'Alice', score: 1500 },
  { rank: 2, name: 'Bob', score: 1400 },
  { rank: 3, name: 'Charlie', score: 1300 },
  { rank: 4, name: 'Dave', score: 1200 },
  { rank: 5, name: 'Eve', score: 1100 },
];

const season = "Season 1";

const Leaderboard: React.FC = () => {
  return (
    <div className="mt-20 flex flex-col items-center justify-center p-4 space-y-6">
      <h1 className="text-4xl font-bold mb-4 text-center text-white">
        {season} Leaderboard
      </h1>
      <div className="flex flex-col lg:flex-row w-full max-w-6xl space-x-0 lg:space-x-6 space-y-6 lg:space-y-0">
        <div className="flex-1 bg-gradient-to-br from-zinc-900 via-zinc-910 to-black shadow-2xl rounded-lg p-6 border border-gray-600 dark:border-gray-700">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">
            Top Operators
          </h1>
          <table className="w-full text-left text-white">
            <thead className="rounded-lg">
              <tr className="bg-gradient-radial from-zinc-800 to-zinc-850 rounded-lg">
                <th className="px-4 py-2 border-b-2 border-gray-800 text-lg font-semibold">Rank</th>
                <th className="px-4 py-2 border-b-2 border-gray-800 text-lg font-semibold">Name</th>
                <th className="px-4 py-2 border-b-2 border-gray-800 text-lg font-semibold">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((player, index) => (
                <tr
                  key={player.rank}
                  className={`hover:bg-gray-700 transition-colors duration-200 ${
                    index === 0 ? 'first:rounded-tl-lg first:rounded-tr-lg' : ''
                  } ${
                    index === leaderboardData.length - 1 ? 'last:rounded-bl-lg last:rounded-br-lg' : ''
                  }`}
                >
                  <td className={`px-4 py-2 ${index !== leaderboardData.length - 1 ? 'border-b border-gray-800' : ''}`}>
                    {player.rank}
                  </td>
                  <td className={`px-4 py-2 ${index !== leaderboardData.length - 1 ? 'border-b border-gray-800' : ''}`}>
                    {player.name}
                  </td>
                  <td className={`px-4 py-2 ${index !== leaderboardData.length - 1 ? 'border-b border-gray-800' : ''}`}>
                    {player.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full lg:w-1/3 bg-gradient-to-br from-zinc-900 via-zinc-910 to-black shadow-2xl rounded-lg p-6 border border-gray-600 dark:border-gray-700">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">
            Highlights
          </h1>
          <div className="text-white space-y-4">
            <div className="flex items-center space-x-2">
              <TrophyIcon className="w-6 h-6 text-yellow-400" />
              <span>Winner of Most Batches Filled: <strong>Alice</strong></span>
            </div>
            <hr className="border-gray-700" />
            <div className="flex items-center space-x-2">
              <TrophyIcon className="w-6 h-6 text-yellow-400" />
              <span>Winner of Most Volume Filled: <strong>Bob</strong></span>
            </div>
            <hr className="border-gray-700" />
            <div className="flex items-center space-x-2">
              <TrophyIcon className="w-6 h-6 text-yellow-400" />
              <span>Winner of Most Surplus Given: <strong>Charlie</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
