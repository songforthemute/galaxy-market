import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { fetcher } from "@libs/client/util";

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <SWRConfig
            value={{
                fetcher,
            }}
        >
            <div className="w-full mx-auto">
                <Component {...pageProps} />
            </div>
        </SWRConfig>
    );
};

export default MyApp;
