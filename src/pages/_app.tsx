import { AuthProvider } from "@/context/authContext";
// import MainLayout from "@/layout/main";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { PropsWithChildren, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
const MainLayout = dynamic(() => import("@/layout/main"), { ssr: false });

const App = React.memo((props: PropsWithChildren<{}>) => {
  const router = useRouter();

  if (router.pathname !== "/login") {
    return <MainLayout>{props.children}</MainLayout>;
  } else {
    return <>{props.children}</>;
  }
});

export default React.memo(({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <App>
        <Toaster
  position="top-center"
  reverseOrder={false}
/>
          <Component {...pageProps} />
        </App>
      </QueryClientProvider>
    </AuthProvider>
  );
});
