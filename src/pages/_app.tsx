import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Amplify } from "aws-amplify";
import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import awsconfig from "../aws-exports";
import { AuthContext } from "../context/AuthContext";
import createEmotionCache from "../createEmotionCache";
import theme from "../theme";

Amplify.configure({ ...awsconfig, ssr: true });

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const queryClient = new QueryClient();

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <title>Reddit Clone AWS</title>{" "}
          <meta name="description" content="Reddit Clone by NoerGitKat" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AuthContext>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </AuthContext>
        <ReactQueryDevtools />
      </CacheProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
