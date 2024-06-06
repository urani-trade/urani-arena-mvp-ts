
import OrderBatch from '@/components/order-batch'
import { TokenTransferGraph } from '@/components/token-transfer-graph'

export default function Arena() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center">
      <div className="w-full md:w-7/10 order-2 md:order-1">
        <TokenTransferGraph />
      </div>
      <div className="w-full md:w-3/10 order-1 md:order-2 flex items-center justify-center md:justify-start text-center md:text-left lg:ml-20">
        <OrderBatch />
      </div>
    </div>
  );
}


