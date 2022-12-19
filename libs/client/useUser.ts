import { User } from "@prisma/client";
import { useRouter } from "next/router";
import useSWR from "swr";
import useFetch from "./useFetch";

interface ProfileReturn {
    status: boolean;
    profile: User;
}

const useUser = () => {
    const router = useRouter();
    const { fetcher } = useFetch();
    const { data, error } = useSWR<ProfileReturn>(
        router.pathname !== "/auth" ? "/api/users/me" : null,
        fetcher
    ); // url: fetching url & key used when caching

    return { user: data?.profile, isLoading: !data && !error };
};

export default useUser;
