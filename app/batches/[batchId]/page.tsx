import Arena from '@/components/arena';

export default function BatchPage({ params }: { params: { batchId: string } }) {
  return <Arena initialBatchId={params.batchId} liveStream={false} />;
}
