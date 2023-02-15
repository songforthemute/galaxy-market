import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
// types
import type { Dispatch, SetStateAction } from "react";
// utils
import { booleanCls } from "@libs/client";
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
    formMethod: "login" | "join";
    setFormMethod: Dispatch<SetStateAction<"login" | "join">>;
    mutatorFn: (data: FormInterface) => void;
    loading: boolean;
    errors?: {
        type: "email" | "password" | "passwordConfirm" | "username";
        message: string;
    };
}

const AuthForm = ({
    formMethod,
    setFormMethod,
    mutatorFn,
    loading,
    errors,
}: Props) => {
    const formProviderValues = useForm<FormInterface>({
        reValidateMode: "onBlur",
    });
    const { reset, handleSubmit, setError } = formProviderValues;
    const _onSubmit = (data: FormInterface) => {
        if (loading) return;

        if (formMethod === "join" && data.password !== data.passwordConfirm) {
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
    }, [errors, setError]);

    return (
        <section className={s.root}>
            <nav className={s.nav}>
                <h1 className={s.heading}>
                    {formMethod === "login" ? "로그인하기" : "지금 합류하기"}
                </h1>

                <ul className={s.methods}>
                    <li>
                        <button
                            className={booleanCls(
                                formMethod === "login",
                                s.active,
                                s.nonactive
                            )}
                            onClick={() => {
                                setFormMethod("login");
                                reset();
                            }}
                        >
                            로그인
                        </button>
                    </li>

                    <li>
                        <button
                            className={booleanCls(
                                formMethod === "join",
                                s.active,
                                s.nonactive
                            )}
                            onClick={() => {
                                setFormMethod("join");
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
                    aria-label="Authentication Form"
                    onSubmit={handleSubmit(_onSubmit)}
                    className="w-full md:max-w-[50vw] justify-center"
                >
                    {formMethod === "login" ? <LoginForm /> : <JoinForm />}
                    <Button
                        loading={loading}
                        className="rounded-lg w-full mt-8"
                    >
                        {formMethod === "login"
                            ? "로그인하기"
                            : "지금 가입하기"}
                    </Button>
                </form>
            </FormProvider>
        </section>
    );
};

export default AuthForm;
