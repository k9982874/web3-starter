import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { sendTransaction, prepareSendTransaction, waitForTransaction } from '@wagmi/core'
import { BigNumber } from 'alchemy-sdk'

export function useTransferBalance(to: `0x${string}`, value: number | string | BigNumber, opts?: UseQueryOptions) {
  const queryFn = async () => {
    const v = value instanceof BigNumber ? value : BigNumber.from(value)
    const config = await prepareSendTransaction({ request: { to, value: v } })
    const { hash } = await sendTransaction(config)
    return await waitForTransaction({ hash })
  }

  return useQuery(
    [ 'transferBalance', to, value ],
    queryFn,
    {
      ...opts,
      retry: false,
    }
  )
}
