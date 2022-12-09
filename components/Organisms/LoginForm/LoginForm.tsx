import { useFormContext } from "react-hook-form";
// components
import { PasswordInput, TextInput } from "@components/Molecules";

interface LoginFormInterface {
    email: string;
    password: string;
}

const LoginForm = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<LoginFormInterface>();

    return (
        <>
            <TextInput
                label="이메일"
                id="email"
                type="email"
                placeholder={"이메일 주소를 입력해주세요."}
                register={register("email", {
                    required: true,
                    pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                        message: "올바른 이메일 주소를 입력해 주세요.",
                    },
                })}
                error={errors?.email?.message}
            >
                이메일 주소
            </TextInput>

            <PasswordInput
                label="비밀번호"
                id="password"
                placeholder={"비밀번호를 입력해주세요."}
                register={register("password", {
                    required: true,
                    minLength: {
                        message: "4~16자 사이의 비밀번호를 입력해주세요.",
                        value: 4,
                    },
                    maxLength: {
                        message: "4~16자 사이의 비밀번호를 입력해주세요.",
                        value: 16,
                    },
                })}
                error={errors?.password?.message}
            >
                비밀번호
            </PasswordInput>
        </>
    );
};

export default LoginForm;
