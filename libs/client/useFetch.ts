const useFetch = () => {
    const fetcher = async (url: string, opts?: any) => {
        const response = await fetch(url, opts);
        return await response.json();
    };

    return { fetcher };
};

export default useFetch;
