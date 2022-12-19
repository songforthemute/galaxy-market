import { useFormContext } from "react-hook-form";
// components
import {
    NumberInput,
    TextareaWithLabel,
    TextInput,
} from "@components/Molecules";

interface UploadTypeInputsInterface {
    name: string;
    price: number;
    option?: string;
    description?: string;
}

const UploadItemInputs = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<UploadTypeInputsInterface>();

    return (
        <>
            <TextInput
                id="name"
                label={"상품명"}
                required
                placeholder={"업로드할 상품의 이름을 입력해주세요."}
                register={register("name", {
                    required: "필수로 입력해야하는 필드입니다.",
                })}
                error={errors?.name?.message}
            />

            <TextInput
                id="option"
                label={"상품 옵션"}
                placeholder={"업로드할 상품의 옵션을 입력해주세요."}
                register={register("option")}
            />

            <NumberInput
                id="price"
                label="상품 가격"
                required
                heading="₩"
                placeholder="업로드할 상품의 가격을 입력해주세요."
                register={register("price", {
                    required: "가격을 입력해주세요.",
                    min: {
                        value: 0,
                        message: "정확한 가격을 입력해주세요.",
                    },
                })}
                error={errors?.price?.message}
            />

            <TextareaWithLabel
                id="description"
                label="상품 설명"
                placeholder="업로드할 상품의 간단한 설명을 입력해주세요."
                register={register("description")}
            />
        </>
    );
};

export default UploadItemInputs;
