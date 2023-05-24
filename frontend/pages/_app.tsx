import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { createConfig, configureChains, WagmiConfig } from 'wagmi'
import { polygonMumbai } from 'viem/chains' 
import { publicProvider } from 'wagmi/providers/public'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { deepmerge } from '@mui/utils'

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
  const themeMUI = createTheme({});

  const themes = deepmerge(theme, themeMUI)

  return (
    <ChakraProvider theme={extendTheme({
      styles: {
        global: (props: any) => ({
          body: {
            bg: "#282339"
          }
        })
      }
    })} resetCSS>
      <ThemeProvider theme={themes}>
        <WagmiConfig config={config}>
          <Component {...pageProps} />
        </WagmiConfig>
      </ThemeProvider>
    </ChakraProvider>
  )
}

export default MyApp
