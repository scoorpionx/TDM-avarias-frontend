import { ThemeProvider } from "styled-components"
import { GlobalStateProvider } from "../context/useGlobalState"
import GlobalStyle from '../styles/global'
import theme from '../styles/theme'

function MyApp({ Component, pageProps }) {
  return (
    <GlobalStateProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <GlobalStyle />
      </ThemeProvider>
    </GlobalStateProvider>
  )
}

export default MyApp
