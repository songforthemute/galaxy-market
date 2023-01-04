import { useForm } from "react-hook-form";
// component
import { Button, PasswordInput, TextInput } from "components";

interface FormInterface {
    passwordAnswer: string;
    newPassword: string;
    newPasswordConfirm: string;
}

interface Props {
    question?: string;
    loading?: boolean;
    mutatorFn: (data?: FormInterface | any) => void;
    id?: string;
    error?: string;
}

const AccountResetForm = ({
    question,
    loading = false,
    mutatorFn,
    id,
    error,
}: Props) => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormInterface>({
        reValidateMode: "onBlur",
    });

    const onSubmit = (data: FormInterface) => {
        if (data.newPassword !== data.newPasswordConfirm) {
            setError("newPasswordConfirm", {
                message: "비밀번호와 확인란이 일치하지 않습니다.",
            });
            return;
        }

        mutatorFn({ ...data, id });
    };

    return (
        <form
            aria-label="Account Password Reset Form"
            className="w-full md:max-w-[50vw] justify-center"
            onSubmit={handleSubmit(onSubmit)}
        >
            <TextInput
                aria-label="Password Question for Password Reset"
                id="passwordQuestion"
                label="비밀번호 찾기 질문"
                disabled
                placeholder={question}
            />

            <TextInput
                required
                aria-label="Password Question Answer for Password Reset"
                register={register("passwordAnswer", {
                    required: true,
                })}
                id="passwordAnswer"
                label="비밀번호 찾기 답"
                placeholder="비밀번호 찾기 질문의 답을 입력해 주세요."
                error={error}
            />

            <PasswordInput
                aria-label="New Password for Password Reset"
                id="newPassword"
                label="새 비밀번호"
                placeholder="새로 변경할 비밀번호를 입력해 주세요."
                required
                register={register("newPassword", {
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
            />

            <PasswordInput
                aria-label="New Password Confirm for Password Reset"
                id="newPasswordConfirm"
                label="새 비밀번호 확인"
                placeholder="비밀번호를 한 번 더 입력해 주세요."
                required
                register={register("newPasswordConfirm", {
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
                error={errors.newPasswordConfirm?.message}
            />

            <Button className="rounded-lg w-full mt-8" loading={loading}>
                재설정하기
            </Button>
        </form>
    );
};

export default AccountResetForm;
