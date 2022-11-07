import { useEffect, useState } from "react";

export const useInfiniteScrollDown = () => {
    const [page, setPage] = useState(1);
    const _handleScroll = () => {
        if (
            window.scrollY + window.innerHeight ===
                document.documentElement.scrollHeight ||
            window.scrollY + window.innerHeight === document.body.scrollHeight
        ) {
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", _handleScroll);

        // Clean up for ComponentDidUnmount
        return () => {
            window.removeEventListener("scroll", _handleScroll);
        };
    }, []);

    return page;
};

