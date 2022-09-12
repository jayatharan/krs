import '../styles/globals.css'
import {ThemeProvider} from '@mui/material'
import {theme} from '../styles/theme'
import createEmotionCache from "../utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import AuthProvider from '../auth/AuthProvider';
import { RecoilRoot } from 'recoil';
import DefaultLayout from '../shared/layout/default/DefaultLayout';

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
      <RecoilRoot>
        <AuthProvider>
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        </AuthProvider>
      </RecoilRoot>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
