// types
import type { UseFormRegisterReturn } from "react-hook-form";
// styles
import s from "./ChatInput.module.css";
// components
import { Button, Input, PaperAirPlane } from "@components/Atoms";

interface Props {
    register?: UseFormRegisterReturn;
    loading?: boolean;
    placeholder?: string;
    id?: string;
    required?: boolean;
}

const ChatInput = ({
    register,
    loading = false,
    id,
    placeholder,
    required = false,
}: Props) => {
    return (
        <div className={s.root}>
            <div className={s.container}>
                <Input
                    id={id}
                    required={required}
                    placeholder={placeholder}
                    register={register}
                />

                <Button className={s.button} loading={loading}>
                    <PaperAirPlane w={5} h={5} />
                </Button>
            </div>
        </div>
    );
};

export default ChatInput;
