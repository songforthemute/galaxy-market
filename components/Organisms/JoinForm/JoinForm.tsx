import { PasswordInput, TextInput } from "@components/Molecules";
import { useFormContext } from "react-hook-form";

interface JoinFormInterface {
    email: string;
    password: string;
    passwordConfirm: string;
    username: string;
}

const JoinForm = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<JoinFormInterface>();

    return (
        <>
            <TextInput
                id="email"
                type="email"
                label={"이메일"}
                placeholder={"사용하실 이메일 주소를 입력해주세요."}
                register={register("email")}
                error={errors?.email?.message}
            ></TextInput>

            <TextInput
                id="username"
                type="username"
                label={"닉네임"}
                placeholder={"사용하실 닉네임을 입력해주세요."}
                register={register("username")}
                error={errors?.username?.message}
            ></TextInput>

            <PasswordInput
                id="password"
                label={"비밀번호"}
                placeholder={"사용하실 비밀번호를 입력해주세요."}
                register={register("password")}
                error={errors?.password?.message}
            ></PasswordInput>

            <PasswordInput
                id="passwordConfirm"
                label={"비밀번호 확인"}
                placeholder={"비밀번호를 한번 더 입력해주세요."}
                register={register("passwordConfirm")}
                error={errors?.passwordConfirm?.message}
            ></PasswordInput>
        </>
    );
};

export default JoinForm;
