import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <SWRConfig
            value={{
                fetcher: async (url: string) => {
                    const response = await fetch(url);
                    return await response.json();
                },
            }}
        >
            <div className="w-full mx-auto">
                <Component {...pageProps} />
            </div>
        </SWRConfig>
    );
};

export default MyApp;
