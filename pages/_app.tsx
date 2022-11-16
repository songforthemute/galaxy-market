import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import useUser from "@libs/client/useUser";
import { fetcher } from "@libs/client/util";

const MyApp = ({ Component, pageProps }: AppProps) => {
    // useUser();

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
