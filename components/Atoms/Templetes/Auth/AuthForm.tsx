import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
// utils
import { booleanCls } from "@libs/client/util";
// styles
import s from "./AuthForm.module.css";
// components
import { Text, Button } from "@components/Atoms";
import { JoinForm, LoginForm } from "@components/Organisms";

interface FormInterface {
    email: string;
    password: string;
    passwordConfirm?: string;
    username?: string;
}

interface Props {
    mutatorFn: (data: FormInterface) => void;
    loading: boolean;
    error?: {
        type: string;
        message: string;
    };
}

const AuthForm = ({ mutatorFn, loading, error }: Props) => {
    const [method, setMethod] = useState<"login" | "join">("login");

    const formProviderValues = useForm<FormInterface>({
        reValidateMode: "onBlur",
    });
    const { reset, handleSubmit, setError } = formProviderValues;
    const _onSubmit = (data: FormInterface) => {
        if (loading) return;

        if (method === "join" && data.password !== data.passwordConfirm) {
            setError("passwordConfirm", {
                message: "비밀번호가 일치하지 않아요.",
            });
            return;
        }

        mutatorFn(data);
    };

    return (
        <section className={s.root}>
            <nav className={s.nav}>
                <Text variant="pageHeading">
                    {method === "login" ? "login now" : "join now"}
                </Text>

                <ul className={s.methods}>
                    <li
                        className={booleanCls(
                            method === "login",
                            s.active,
                            s.nonactive
                        )}
                        onClick={() => {
                            setMethod("login");
                            reset();
                        }}
                    >
                        <button>로그인하기</button>
                    </li>

                    <li
                        className={booleanCls(
                            method === "login",
                            s.active,
                            s.nonactive
                        )}
                        onClick={() => {
                            setMethod("join");
                            reset();
                        }}
                    >
                        <button>가입하기</button>
                    </li>
                </ul>
            </nav>

            <FormProvider {...formProviderValues}>
                <form onSubmit={handleSubmit(_onSubmit)}>
                    {method === "login" ? <LoginForm /> : <JoinForm />}
                    <Button
                        loading={loading}
                        className="rounded-lg w-full mt-8"
                    >
                        {method === "login" ? "로그인" : "가입"}
                    </Button>
                </form>
            </FormProvider>
        </section>
    );
};

export default AuthForm;
