import { useState } from "react";

interface UseMutationState<T> {
    loading: boolean;
    data?: T;
    error?: any;
}

type MethodType = "GET" | "POST" | "PUT" | "DELETE";

type UseMutationReturn<T> = [(data: any) => void, UseMutationState<T>];

interface useMutationProps {
    url: string;
    method: MethodType;
}

const useMutation = <T extends any>({
    url,
    method,
}: useMutationProps): UseMutationReturn<T> => {
    const [state, setState] = useState<UseMutationState<T>>({
        loading: false,
        data: undefined,
        error: undefined,
    });

    const mutation = (data: any) => {
        setState((prev) => ({ ...prev, loading: true }));

        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json().catch(() => {}))
            .then((data) => setState((prev) => ({ ...prev, data })))
            .catch((error) => setState((prev) => ({ ...prev, error })))
            .finally(() => setState((prev) => ({ ...prev, loading: false })));
    };

    return [mutation, { ...state }];
};

export default useMutation;
