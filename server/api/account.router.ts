import { z } from 'zod';
import { publicProcedure, router } from '@/server/trpc';

import { alchemy } from '@/lib/alchemy';
import { AssetTransfersCategory, SortingOrder } from 'alchemy-sdk';

import { prisma } from '@/lib/db';

export const accountRouter = router({
  bind: publicProcedure
    .input(
      z.object({
        connector: z.string(),
        wallet: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const wallet = await prisma.wallet.findFirst({
        where: {
          address: {
            in: input.wallet,
          },
        },
        include: {
          account: true,
        },
      });

      if (wallet) {
        return wallet.account!.id;
      }

      const account = await prisma.account.create({
        data: {
          wallets: {
            create: [{
              address: input.wallet,
              connector: input.connector,
            }],
          },
        },
      });

      return account.id;
    }),
  transactions: publicProcedure
    .input(
      z.object({
        address: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const resp = await alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        toBlock: "latest",
        fromAddress: input.address,
        order: SortingOrder.DESCENDING,
        excludeZeroValue: true,
        category: [
          AssetTransfersCategory.EXTERNAL,
          AssetTransfersCategory.ERC20,
          AssetTransfersCategory.ERC721,
          AssetTransfersCategory.ERC1155,
          AssetTransfersCategory.SPECIALNFT,
        ],
      });
      return resp;
    }),
});
