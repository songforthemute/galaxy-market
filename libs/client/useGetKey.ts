interface getKeyInterface {
    pageNum: number;
}

export const useGetKey = <T extends getKeyInterface = any>(url: string) => {
    return (pageIdx: number, prevPageData: T) => {
        if (pageIdx === 0) return `${url}?page=1`;
        if (pageIdx + 1 > prevPageData.pageNum) return null;
        return `${url}?page=${pageIdx + 1}`;
    };
};
