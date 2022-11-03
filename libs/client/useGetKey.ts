interface getKeyInterface {
    pageNum: number;
}

interface useGetKeyProps {
    url: string;
    hasQuery?: boolean;
}

export const useGetKey = <T extends getKeyInterface>({
    url,
    hasQuery = false,
}: useGetKeyProps) => {
    return (pageIdx: number, prevPageData: T) => {
        if (pageIdx === 0) return `${url}${hasQuery ? "&" : "?"}page=1`;
        if (pageIdx + 1 > prevPageData.pageNum) return null;
        return `${url}?page=${pageIdx + 1}`;
    };
};
