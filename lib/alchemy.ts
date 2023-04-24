import { Alchemy, Network } from 'alchemy-sdk';

const globalForAlchemy = global as unknown as {
  alchemy: Alchemy | undefined
}

export const alchemy =
  globalForAlchemy.alchemy ??
  new Alchemy({
    apiKey: process.env.ALCHEMY_API_KEY,
    network: process.env.ETH_NETWORK as Network,
  })

if (process.env.NODE_ENV !== 'production') globalForAlchemy.alchemy = alchemy