import { useForm } from "react-hook-form";
// styles
import s from "./WithdrawalModal.module.css";
// components
import { Button, Modal, Text } from "@components/Atoms";
import { TextInput } from "@components/Molecules";

interface FormInterface {
    email: string;
}

interface Props {
    onClose: () => void;
    mutatorFn: (data: FormInterface) => void;
    loading?: boolean;
    error?: string;
    userEmail?: string;
}

const WithdrawalModal = ({
    onClose,
    mutatorFn,
    loading = false,
    error,
    userEmail,
}: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInterface>({
        reValidateMode: "onBlur",
    });
    const _onSubmit = (data: FormInterface) => {
        if (loading) return;
        if (userEmail !== undefined && data.email !== userEmail) return;

        mutatorFn(data);
    };

    return (
        <Modal onClose={onClose}>
            <div className={s.root}>
                <Text className="pl-1 pb-2" variant="pageHeading">
                    정말 탈퇴하시겠습니까?
                </Text>
                <Text className="pl-1 text-achroma-dark" variant="body">
                    탈퇴한 후 데이터는 다시 복구할 수 없습니다.
                </Text>
                <Text className="pl-1 text-achroma-dark" variant="body">
                    탈퇴하시려면 이메일 주소를 다시 한 번 입력해주세요.
                </Text>

                <form onSubmit={handleSubmit(_onSubmit)} className={s.form}>
                    <TextInput
                        id="email"
                        placeholder="이메일 주소를 입력해주세요. 😂"
                        type="email"
                        register={register("email", {
                            required: true,
                            pattern: {
                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                message: "올바른 이메일 주소를 입력해 주세요.",
                            },
                        })}
                        error={errors?.email?.message || error}
                    />
                    <Button loading={loading} className={s.button}>
                        탈퇴하기
                    </Button>
                </form>
            </div>
        </Modal>
    );
};

export default WithdrawalModal;
