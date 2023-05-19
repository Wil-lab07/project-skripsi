import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { createConfig, configureChains, WagmiConfig } from 'wagmi'
import { polygonMumbai } from 'viem/chains' 
import { publicProvider } from 'wagmi/providers/public'

function MyApp({ Component, pageProps }: AppProps) {
  
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [polygonMumbai],
    [publicProvider()]
  )

  const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
  })

  const theme = extendTheme({
    styles: {
      global: (props: any) => ({
        body: {
          bg: "#1a202c"
        }
      })
    }
  })
  
  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig config={config}>
        <Component {...pageProps} />
      </WagmiConfig>
    </ChakraProvider>
  )
}

export default MyApp
