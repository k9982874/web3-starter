import { z } from 'zod';
import { publicProcedure, router } from '@/server/trpc';

import { alchemy } from '@/lib/alchemy';
import { AssetTransfersCategory } from 'alchemy-sdk';

export const pingRouter = router({
  ping: publicProcedure
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
        excludeZeroValue: true,
        category: [
          AssetTransfersCategory.ERC1155,
        ],
      });
      return resp;
    }),
});