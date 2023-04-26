import { useAccount, useBalance } from "wagmi"

export function Balance() {
  const { address } = useAccount()

  const { data: balance } = useBalance({ address, enabled: !!address })
  if (!balance) {
    return null
  }

  return (
    <span className="text-xs">{balance.formatted} {balance.symbol}</span>
  )
}