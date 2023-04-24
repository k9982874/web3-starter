import type { AppProps } from 'next/app'
import { trpc } from '@/lib/trpc'

import { WagmiConfig, createClient, configureChains } from 'wagmi'
import { polygonMumbai } from '@wagmi/core/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

import { ThemeProvider } from "next-themes"

import { Inter as FontSans } from "@next/font/google"

import { Toaster } from "@/components/ui/toaster"

import "@/styles/globals.css"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const { chains, provider, webSocketProvider } = configureChains(
  [ polygonMumbai ],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY! }), publicProvider()],
)

const wagmiClient = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors: [
    new MetaMaskConnector({ chains }),
  ],
})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-sans: ${fontSans.style.fontFamily};
        }
        #__next {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
      `}</style>
      <WagmiConfig client={wagmiClient}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Component {...pageProps} />
          <Toaster />
        </ThemeProvider>
      </WagmiConfig>
    </>
  )
}

export default trpc.withTRPC(App);
