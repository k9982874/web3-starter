## Dependencies
### [Next.js](https://nextjs.org/)
The React Framework for the Web
```
npx create-next-app@latest --typescript
```

### [shadcn](https://ui.shadcn.com/)
UI library with Next.js framework
```
npx create-next-app -e https://github.com/shadcn/next-template
```

### [tailwindcss](https://tailwindcss.com/)
A utility-first CSS framework
```
npm install -D tailwindcss
```

### [tRPC](https://trpc.io/)
tRPC is a solution that allows for the creation and consumption of TypeScript-enabled typesafe APIs.
```
npm install @trpc/server @trpc/client
```

### [zod](https://github.com/colinhacks/zod)
TypeScript-first schema validation with static type inference
```
npm install zod
```

### [prisma](https://www.prisma.io/)
TypeScript ORM
```
npm install prisma --save-dev
```

### [wagmi](https://www.prisma.io/)
React Hooks for Ethereum
<https://wagmi.sh>
```
npm i wagmi ethers@^5
```

## How to use
1. Clone the latest code from Github
2. Copy `env.example` to `.env.local`
3. Edit `.env.local`
4. Run the command `npm install`
5. Run the command `npx prisma db pusb` to initialize the database
6. Run the command `npx prisma generate`
7. Run the command `npm run dev`
