import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "./util";

interface ProfileReturn {
    status: boolean;
    profile: User;
}

const useUser = () => {
    const router = useRouter();
    const { data, error } = useSWR<ProfileReturn>(
        router.pathname !== "/auth" ? "/api/users/me" : null,
        fetcher
    ); // url: fetching url & key used when caching

    useEffect(() => {
        if (data && !data.status) {
            router.replace("/auth", "/");
        }
    }, [data, router]);

    return { user: data?.profile, isLoading: !data && !error };
};

export default useUser;
