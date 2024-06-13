'use client';

import OrderBatch from '@/components/batch/order-batch'
import { TokenTransferGraph } from '@/components/token-transfer-graph'
import {useEffect, useState} from "react";
import axios from "axios";
import {log} from "next/dist/server/typescript/utils";
import {IBatch} from "@/types";

export default function Arena() {

    const [batchData, setBatchData] = useState<IBatch | null>(null);

    const [selectedSolutionId, setSelectedSolutionId] = useState<string>('1');

    const fetchData = async (id:string) => {
        try {
            const response = await axios.get(
                `http://ec2-18-118-1-69.us-east-2.compute.amazonaws.com/api/batches/${id}`);
            console.log('response', response.data);
            setBatchData(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchData(selectedSolutionId);
    }, [selectedSolutionId]);



  return (
    <div className="flex flex-col md:flex-row justify-center">
      <div className="w-full md:w-8/10 order-2 md:order-1">
        <TokenTransferGraph solutions={batchData?.solutions} />
      </div>
      <div className="w-full md:w-2/10 order-1 md:order-2 flex items-start  md:justify-end text-center md:text-left lg:ml-20">
        <OrderBatch
            batch={batchData as IBatch}
            selectedSolutionId={selectedSolutionId as string}
            handleSelectSolution={setSelectedSolutionId}
            handleChangeBatchId={setSelectedSolutionId}
        />
      </div>
    </div>
  );
}


