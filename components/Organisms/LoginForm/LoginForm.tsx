import { PasswordInput, TextInput } from "@components/Molecules";
import { useState } from "react";
// types
// import type { UseFormRegisterReturn } from "react-hook-form";

interface Props {
    // emailRegister?: UseFormRegisterReturn;
    // passwordRegister?: UseFormRegisterReturn;
}

const LoginForm = ({}: Props) => {
    const [hide, setHide] = useState(false);
    const _onClickHide = () => setHide((prev) => !prev);

    return (
        <>
            <TextInput
                id="email"
                type="email"
                // register={emailRegister}
                placeholder={"이메일 주소를 입력해주세요."}
            >
                이메일 주소
            </TextInput>

            <PasswordInput
                id="password"
                hide={hide}
                onClick={_onClickHide}
                // register={passwordRegister}
                placeholder={"비밀번호를 입력해주세요."}
            >
                비밀번호
            </PasswordInput>
        </>
    );
};

export default LoginForm;
