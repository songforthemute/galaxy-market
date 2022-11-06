interface getKeyInterface {
    pageNum: number;
}

interface useGetKeyProps {
    url: string | null;
    hasQuery?: boolean;
}

const useGetKey = <T extends getKeyInterface>({
    url,
    hasQuery = false,
}: useGetKeyProps) => {
    return (pageIdx: number, prevPageData: T) => {
        if (pageIdx === 0 && url !== null)
            return `${url}${hasQuery ? "&" : "?"}page=1`;
        if (pageIdx + 1 > prevPageData.pageNum || url === null) return null;
        return `${url}?page=${pageIdx + 1}`;
    };
};

export default useGetKey;
