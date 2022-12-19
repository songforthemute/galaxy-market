import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { ManagedUIContext } from "@components/contexts/uiContext";
import useFetch from "@libs/client/useFetch";

const MyApp = ({ Component, pageProps }: AppProps) => {
    const { fetcher } = useFetch();

    return (
        <SWRConfig
            value={{
                fetcher,
            }}
        >
            <ManagedUIContext>
                <div className="w-full mx-auto">
                    <Component {...pageProps} />
                </div>
            </ManagedUIContext>
        </SWRConfig>
    );
};

export default MyApp;
