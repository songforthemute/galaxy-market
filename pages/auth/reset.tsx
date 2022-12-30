import { useRouter } from "next/router";
import { useEffect } from "react";
// type
import type { NextPage } from "next";
// custom hooks
import { useMutation } from "@libs/client";
// components
import { Layout } from "components";
import AccountResetForm from "@components/Organisms/AccountResetForm";

// interfaces
interface AuthenticationReturn {
    status: boolean;
    error?: string;
}

// Page
const Reset: NextPage = () => {
    const { push, query } = useRouter();

    // for reset password
    const [resetPassword, { loading, data }] =
        useMutation<AuthenticationReturn>({
            url: "/api/users/auth/reset",
            method: "PUT",
        });

    useEffect(() => {
        if (data?.status === true) {
            push("/auth?isReset=true", "/auth");
        }
    }, [data, push]);

    return (
        <Layout title={"비밀번호 찾기"} backwardButton>
            <div className="mx-auto flex flex-col items-center justify-center px-4">
                <h1 className="my-8 font-semibold text-lg border-b-2 pb-2.5 px-4">
                    비밀번호 재설정
                </h1>

                <AccountResetForm
                    mutatorFn={resetPassword}
                    loading={loading}
                    question={query.question as string}
                    id={query.id as string}
                    error={data?.error}
                />
            </div>
        </Layout>
    );
};

export default Reset;
