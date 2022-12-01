import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { fetcher } from "@libs/client/util";
import { ManagedUIContext } from "@components/contexts/uiContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
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
