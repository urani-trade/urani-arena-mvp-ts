'use client';

import OrderBatch from '@/components/batch/order-batch'
import { TokenTransferGraph } from '@/components/token-transfer-graph'
import {useEffect, useState} from "react";
import axios from "axios";

export default function Arena() {

    const [batchData, setBatchData] = useState(null);
    const batchId = '1';
    const [selectedSolutionId, setSelectedSolutionId] = useState<string | null>(null);

    useEffect(() => {


        fetch('http://ec2-18-118-1-69.us-east-2.compute.amazonaws.com/api/batches/1', {
            method: 'GET',
            mode: 'no-cors'
        })
            .then(response => {
                console.log('response', response);
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }, []);



  return (
    <div className="flex flex-col md:flex-row justify-center">
      <div className="w-full md:w-8/10 order-2 md:order-1">
        <TokenTransferGraph batch={batchData} />
      </div>
      <div className="w-full md:w-2/10 order-1 md:order-2 flex items-start  md:justify-end text-center md:text-left lg:ml-20">
        <OrderBatch
            batch={batchData}
            selectedSolutionId={selectedSolutionId as string}
            handleSelectSolution={setSelectedSolutionId}
        />
      </div>
    </div>
  );
}


