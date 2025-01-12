import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { NextPage } from "next";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import { useState } from "react";

import "../assets/styles/main.scss";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        {getLayout(<Component {...pageProps} />)}
      </Hydrate>

      {process.env.NEXT_PUBLIC_DISPLAY_REACT_QUERY_DEBUGGER == "true" && (
        <ReactQueryDevtools initialIsOpen position={"bottom-right"} />
      )}
    </QueryClientProvider>
  );
}

const translatedApp = appWithTranslation(CustomApp);

export default translatedApp;
