
import OrderBatch from '@/components/order-batch'
import { TokenTransferGraph } from '@/components/token-transfer-graph'

export default function Arena() {
  return (
    <div>
      <div className="flex justify-center">
        <OrderBatch />
      </div>
      <TokenTransferGraph />
    </div>
  )
}
