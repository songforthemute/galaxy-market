// components
import { Button, Modal, Text } from "@components/Atoms";
import { TextInput } from "@components/Molecules";
import { useForm } from "react-hook-form";

interface FormInterface {
    email: string;
}

interface Props {
    onClose: () => void;
    mutatorFn: (data: FormInterface | any) => void;
    loading?: boolean;
    errors?: string;
}

const AuthResetModal = ({
    onClose,
    mutatorFn,
    loading = false,
    errors,
}: Props) => {
    const { register, handleSubmit } = useForm<FormInterface>({
        reValidateMode: "onBlur",
    });
    const onSubmit = (data: FormInterface) => {
        mutatorFn(data);
    };

    return (
        <Modal onClose={onClose}>
            <form
                aria-label="Email Validation Form for Password Reset"
                onSubmit={handleSubmit(onSubmit)}
                className="px-8 py-12"
            >
                <Text variant="pageHeading">비밀번호 찾기</Text>

                <TextInput
                    aria-label="Email Validation Input for Password Reset"
                    type="email"
                    register={register("email", {
                        required: true,
                        pattern: {
                            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                            message: "올바른 이메일 주소를 입력해 주세요.",
                        },
                    })}
                    id="find"
                    label="이메일"
                    placeholder="이메일을 입력해주세요."
                    error={errors}
                />

                <Button
                    // variant="achromaOutline"
                    className="mt-6 rounded-lg w-full"
                    loading={loading}
                    type="submit"
                >
                    찾기
                </Button>
            </form>
        </Modal>
    );
};

export default AuthResetModal;
