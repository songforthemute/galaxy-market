import { FormProvider, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
// utils
import { booleanCls } from "@libs/client/util";
// styles
import s from "./AuthForm.module.css";
// components
import { Button } from "@components/Atoms";
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
    errors?: {
        type: "email" | "password" | "passwordConfirm" | "username";
        message: string;
    };
}

const AuthForm = ({ mutatorFn, loading, errors }: Props) => {
    const [method, setMethod] = useState<"login" | "join">("login");

    const formProviderValues = useForm<FormInterface>({
        reValidateMode: "onBlur",
    });
    const { reset, handleSubmit, setError } = formProviderValues;
    const _onSubmit = (data: FormInterface) => {
        if (loading) return;

        if (method === "join" && data.password !== data.passwordConfirm) {
            setError(
                "passwordConfirm",
                {
                    message: "비밀번호와 비밀번호 확인란이 일치하지 않아요.",
                },
                { shouldFocus: true }
            );

            return;
        }

        mutatorFn(data);
    };
    useEffect(() => {
        if (errors) {
            setError(
                errors.type,
                { message: errors.message },
                { shouldFocus: true }
            );
        }
    }, [errors]);

    return (
        <section className={s.root}>
            <nav className={s.nav}>
                <h1 className={s.heading}>
                    {method === "login" ? "로그인하기" : "지금 가입하기"}
                </h1>

                <ul className={s.methods}>
                    <li>
                        <button
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
                            로그인
                        </button>
                    </li>

                    <li>
                        <button
                            className={booleanCls(
                                method === "join",
                                s.active,
                                s.nonactive
                            )}
                            onClick={() => {
                                setMethod("join");
                                reset();
                            }}
                        >
                            가입
                        </button>
                    </li>
                </ul>
            </nav>

            <FormProvider {...formProviderValues}>
                <form
                    onSubmit={handleSubmit(_onSubmit)}
                    className="md:min-w-[50vw]"
                >
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
