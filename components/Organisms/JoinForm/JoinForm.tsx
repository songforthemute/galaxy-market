import { useFormContext } from "react-hook-form";
import { PasswordInput, TextInput } from "@components/Molecules";

interface JoinFormInterface {
    email: string;
    password: string;
    passwordConfirm: string;
    username: string;
    passwordQuestion: string;
    passwordAnswer: string;
}

const JoinForm = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<JoinFormInterface>();

    return (
        <>
            <TextInput
                aria-label="Email Input for Join"
                id="email"
                type="email"
                label={"이메일"}
                required
                placeholder={"사용하실 이메일 주소를 입력해 주세요."}
                register={register("email", {
                    required: true,
                    pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                        message: "올바른 이메일 주소를 입력해 주세요.",
                    },
                })}
                error={errors?.email?.message}
            />

            <TextInput
                aria-label="Username Input for Join"
                id="username"
                type="text"
                label={"닉네임"}
                required
                placeholder={"사용하실 닉네임을 입력해 주세요."}
                register={register("username", {
                    required: true,
                    minLength: {
                        message: "2~12자 사이로 입력해 주세요.",
                        value: 2,
                    },
                    maxLength: {
                        message: "2~12자 사이로 입력해 주세요.",
                        value: 12,
                    },
                    pattern: {
                        value: /^[a-zA-Zㄱ-힣0-9|s]*$/,
                        message: "특수문자는 사용할 수 없습니다.",
                    },
                })}
                error={errors?.username?.message}
            />

            <PasswordInput
                aria-label="Password Input for Join"
                id="password"
                label={"비밀번호"}
                required
                placeholder={"사용하실 비밀번호를 입력해 주세요."}
                register={register("password", {
                    required: true,
                    minLength: {
                        message: "4~16자 사이의 비밀번호를 입력해 주세요.",
                        value: 4,
                    },
                    maxLength: {
                        message: "4~16자 사이의 비밀번호를 입력해 주세요.",
                        value: 16,
                    },
                })}
                error={errors?.password?.message}
            />

            <PasswordInput
                aria-label="Password Confirmation Input for Join"
                id="passwordConfirm"
                label={"비밀번호 확인"}
                required
                placeholder={"비밀번호를 한 번 더 입력해 주세요."}
                register={register("passwordConfirm", {
                    required: true,
                    minLength: {
                        message: "4~16자 사이의 비밀번호를 입력해 주세요.",
                        value: 4,
                    },
                    maxLength: {
                        message: "4~16자 사이의 비밀번호를 입력해 주세요.",
                        value: 16,
                    },
                })}
                error={errors?.passwordConfirm?.message}
            />

            <TextInput
                aria-label="Password Question for Reset Password Later"
                id="passwordQuestion"
                label={"비밀번호 찾기 질문"}
                required
                placeholder={"비밀번호 찾기 질문을 입력해 주세요."}
                register={register("passwordQuestion", {
                    required: true,
                })}
            />

            <TextInput
                aria-label="Password Question Answer for Reset Password Later"
                id="passwordAnswer"
                label={"비밀번호 찾기 답"}
                required
                placeholder={"비밀번호 찾기 질문의 답을 입력해 주세요."}
                register={register("passwordAnswer", {
                    required: true,
                })}
            />
        </>
    );
};

export default JoinForm;
