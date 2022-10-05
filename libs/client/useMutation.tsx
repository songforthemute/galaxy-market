import { useState } from "react";

interface UseMutationState {
    loading: boolean;
    data?: any;
    error?: any;
}
type UseMutationReturn = [(data?: any) => void, UseMutationState];

const useMutation = (url: string): UseMutationReturn => {
    const [state, setState] = useState<UseMutationState>({
        loading: false,
        data: undefined,
        error: undefined,
    });

    const mutation = (data?: any) => {
        setState((prev) => ({ ...prev, loading: true }));

        fetch(url, {
            method: "POST",
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
