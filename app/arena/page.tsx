'use client';

import OrderBatch from '@/components/batch/order-batch'
import { TokenTransferGraph } from '@/components/token-transfer-graph'
import {useEffect, useState} from "react";
import axios from "axios";
import {log} from "next/dist/server/typescript/utils";
import {IBatch} from "@/types";
import * as process from "process";

export default function Arena() {

  const [selectedBatchId, setSelectedBatchId] = useState<string>('1');
  const [batchData, setBatchData] = useState<IBatch | null>(null);

  const [liveStream,setLiveStream] = useState<boolean>(true);

  const [selectedSolutionId, setSelectedSolutionId] = useState<string>('');

  const fetchBatch = async (id:string) => {
      try {
        const response = await axios.get(
          `http://ec2-18-118-1-69.us-east-2.compute.amazonaws.com/api/batches/${id}`
        );
        setBatchData(response.data);
      } catch (error) {
          console.error('Error:', error);
      }
  };

  useEffect(() => {
        fetchBatch(selectedBatchId);
  }, [selectedBatchId]);

  const fetchBatchId = (id:string) => {
      setSelectedBatchId(id);
  }


  return (
    <div className="flex flex-col md:flex-row justify-center">
      <div className="w-full w-8/10 order-2 md:order-1">
        <TokenTransferGraph
            solutions={batchData?.solutions}
            onSolutionSelected={setSelectedSolutionId}
        />
      </div>
      <div className="w-2/10 order-1 md:order-2 flex items-start  md:justify-end text-center md:text-left lg:ml-20">
          {
              batchData &&
              <OrderBatch
                  batch={batchData as IBatch}
                  selectedSolutionId={selectedSolutionId as string}
                  onSolutionSelected={setSelectedSolutionId}
                  liveStream={liveStream}
                  setLiveStream={setLiveStream}
                  fetchBatchId={fetchBatchId}
              />
          }

      </div>
    </div>
  );
}


