import { PasswordInput, TextInput } from "@components/Molecules";
import { useState } from "react";
// types
// import type { UseFormRegisterReturn } from "react-hook-form";

interface Props {
    // emailRegister?: UseFormRegisterReturn;
    // passwordRegister?: UseFormRegisterReturn;
    // passwordConfirmRegister?: UseFormRegisterReturn;
    // usernameRegister?: UseFormRegisterReturn;
}

const JoinForm = ({}: // emailRegister,
// passwordRegister,
// passwordConfirmRegister,
// usernameRegister,
Props) => {
    const [hidePassword, setHidePassword] = useState(false);
    const [hideConfirm, setHideConfirm] = useState(false);

    return (
        <>
            <TextInput
                id="email"
                type="email"
                // register={emailRegister}
                placeholder={"사용하실 이메일 주소를 입력해주세요."}
            >
                이메일 주소
            </TextInput>

            <TextInput
                id="username"
                type="username"
                // register={usernameRegister}
                placeholder={"사용하실 닉네임을 입력해주세요."}
            >
                닉네임
            </TextInput>

            <PasswordInput
                id="password"
                hide={hidePassword}
                onClick={() => setHidePassword((prev) => !prev)}
                // register={passwordRegister}
                placeholder={"사용하실 비밀번호를 입력해주세요."}
            >
                비밀번호
            </PasswordInput>

            <PasswordInput
                id="passwordConfirm"
                hide={hideConfirm}
                onClick={() => setHideConfirm((prev) => !prev)}
                // register={passwordConfirmRegister}
                placeholder={"비밀번호를 한번 더 입력해주세요."}
            >
                비밀번호 확인
            </PasswordInput>
        </>
    );
};

export default JoinForm;
