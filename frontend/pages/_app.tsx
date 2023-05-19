import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from '@wagmi/core';

const theme = extendTheme({
  styles: {
    global: (props: any) => ({
      body: {
        bg: "#1a202c"
      },
    }),
  },
})

const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()]
)

const config = createConfig({
  autoConnect: true,
  connectors: [new InjectedConnector({chains})],
  publicClient
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <WagmiConfig config={config}>
          <Component {...pageProps} />
        </WagmiConfig>
      </ChakraProvider>
    </>
  ) 
}




