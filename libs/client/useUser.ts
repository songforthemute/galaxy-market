import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

const useUser = () => {
    const { data, error } = useSWR("/api/users/me"); // url: fetching url & key used when caching
    const router = useRouter();

    useEffect(() => {
        if (data && !data.status) {
            router.replace("/auth");
        }
    }, [data, router]);

    return { user: data?.profile, isLoading: !data && !error };
};

export default useUser;
