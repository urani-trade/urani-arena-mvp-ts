import {Player, TopPlayer} from "@/components/leaderboard/types";
import {useMemo} from "react";


export const useGetLeaders = (data:Player[]) => {


    return  useMemo(() => {
        if (!data || data.length === 0) return [] as TopPlayer[];
        const mostBatches = data.reduce((maxPlayer, player) => {
            return player.batches > maxPlayer.batches ? player : maxPlayer;
        });

        const mostVolume = data.reduce((maxPlayer, player) => {
            return player.volume > maxPlayer.volume ? player : maxPlayer;
        });

        const mostSurplus = data.reduce((maxPlayer, player) => {
            return player.surplus > maxPlayer.surplus ? player : maxPlayer;
        });

        const topPlayersArray: TopPlayer[] = [
            {
                type: 'Most Batches',
                player: {
                    name: mostBatches.name,
                    avatar: mostBatches.avatar,
                    value: mostBatches.batches,
                    id: mostBatches.id
                }
            },
            {
                type: 'Most Volume',
                player: {
                    name: mostVolume.name,
                    avatar: mostVolume.avatar,
                    value: mostVolume.volume,
                    id: mostVolume.id
                }
            },
            {
                type: 'Most Surplus',
                player: {
                    name: mostSurplus.name,
                    avatar: mostSurplus.avatar,
                    value: mostSurplus.surplus,
                    id: mostSurplus.id
                }
            }
        ];
        return topPlayersArray;
    },[data]);

}
