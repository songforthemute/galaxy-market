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
                register={register("email")}
                error={errors?.email?.message}
            >
                이메일 주소
            </TextInput>

            <PasswordInput
                label="비밀번호"
                id="password"
                placeholder={"비밀번호를 입력해주세요."}
                register={register("password")}
                error={errors?.password?.message}
            >
                비밀번호
            </PasswordInput>
        </>
    );
};

export default LoginForm;
