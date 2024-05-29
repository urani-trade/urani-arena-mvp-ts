import { Input } from './components/input'
import { Field, FieldGroup, Label } from './components/fieldset'
import { Button } from './components/button'
import Arena from './arena'

import { TokenTransferGraph } from '@/components/token-transfer-graph/token-transfer-graph'


export default function Home() {
  return <Arena>
    <TokenTransferGraph />
  </Arena>
}