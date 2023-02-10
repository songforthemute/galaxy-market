/**
 * @description This function support you that obtain json object from data by asynchronously fetching.
 * @returns {{ fetcher: (url: string, opts?: any) => Promise<any> }} `{ fetcher: (url: string, opts?: any) => Promise<any> }`
 */
const useFetch = (): { fetcher: (url: string, opts?: any) => Promise<any> } => {
    const fetcher = async (url: string, opts?: any) => {
        const response = await fetch(url, opts);
        return await response.json();
    };

    return { fetcher };
};

export default useFetch;
