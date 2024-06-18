'use client';

import OrderBatch from '@/components/batch/order-batch';
import { TokenTransferGraph } from '@/components/token-transfer-graph';
import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from 'next/navigation'; // Correct import for app directory
import axios from "axios";
import { IBatch, ITokenMetadata } from "@/types";

const DEFAULT_BATCH_ID = '1'; // Change this to your actual default batch ID

export default function Arena({ initialBatchId, liveStream }: { initialBatchId?: string, liveStream?: boolean }) {
  const router = useRouter();
  const actualBatchId = initialBatchId || DEFAULT_BATCH_ID;

  const [selectedSolutionId, setSelectedSolutionId] = useState<string>('');
  const [selectedBatchId, setSelectedBatchId] = useState<string>(actualBatchId);
  const [batchData, setBatchData] = useState<IBatch | null>(null);
  const [liveStreamState, setLiveStreamState] = useState<boolean>(liveStream || false);
  const [tokenMetadata, setTokenMetadata] = useState<ITokenMetadata | null>(null);

  useEffect(() => {
    setSelectedBatchId(actualBatchId);
  }, [actualBatchId]);

  useEffect(() => {
    if (selectedBatchId) {
      fetchBatch(selectedBatchId);
    }
  }, [selectedBatchId]);

  async function fetchBatch(id: string) {
    try {
      let orderbookUrl = process.env.NEXT_PUBLIC_ORDERBOOK_URL;
      if (!orderbookUrl) {
        throw new Error('NEXT_PUBLIC_ORDERBOOK_URL is not defined');
      }

      const response = await axios.get(
        `${orderbookUrl}/api/batches/${id}`
      );

      setBatchData(response.data);
      setTokenMetadata(response.data.tokenMetadata);
    }
    catch (error) {
      console.error('Error:', error);
    }
  };

  const onSolutionSelected = useCallback((id: string) => {
    console.log('onSolutionSelected', id);
    setLiveStreamState(false);
    setSelectedSolutionId(id);
  }, []);

  const onBatchRequested = useCallback((id: string) => {
    console.log('onBatchRequested', id);
    setSelectedSolutionId('');
    setSelectedBatchId(id);
    if (!liveStream) {
      // TODO update url to batch Id
    }
  }, [router, liveStream]);

  const filteredSolutions = useMemo(() => {
    return batchData?.solutions.filter(solution => solution.agent.name === selectedSolutionId || !selectedSolutionId);
  }, [batchData, selectedSolutionId]);

  return (
    <div className="flex flex-col md:flex-row justify-center">
      <div className="relative w-full w-8/10 order-2 md:order-1">
        {
          selectedSolutionId &&
          <button className="z-10 absolute left-[25px] top-[16px] flex items-center py-2 px-3 rounded-md transition-colors duration-200 ease-in-out
            bg-white hover:bg-hoverWhite active:bg-hoverWhite focus:outline-none focus:ring-2"
            onClick={setSelectedSolutionId.bind(null, '')}
          >
            <img src="/back-arrow.svg" className="mr-3" alt="" />
            <p className="text-backgroundPage">
              Show All Solutions
            </p>
          </button>
        }
        <div className="h-3/4-vh md:h-1/3-vh">
          <TokenTransferGraph
            solutions={filteredSolutions}
            tokenMetadata={tokenMetadata!}
            onSolutionSelected={onSolutionSelected}
          />
        </div>
      </div>
      <div className="w-2/10 order-1 md:order-2 flex items-center md:items-center text-center md:text-left lg:ml-20">
        {
          batchData &&
          <OrderBatch
            onBatchRequested={onBatchRequested}
            batch={batchData as IBatch}
            tokenMetadata={tokenMetadata!}
            selectedSolutionId={selectedSolutionId as string}
            onSolutionSelected={onSolutionSelected}
            liveStream={liveStreamState}
            setLiveStream={setLiveStreamState}
          />
        }
      </div>
    </div>
  );
}
