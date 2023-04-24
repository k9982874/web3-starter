import { z } from 'zod';
import { publicProcedure, router } from '@/server/trpc';
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
});