import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
// types
import type { Post } from "@prisma/client";
// styles
import s from "./UploadPostForm.module.css";
// components
import { TextareaWithLabel, TextInput } from "@components/Molecules";
import {
    Button,
    ErrorMessage,
    Label,
    Select,
    SelectItem,
} from "@components/Atoms";

interface FormInterface {
    title: string;
    description: string;
    tag: string;
}

interface PresetInterface extends Post {
    user: {
        username: string;
        avatarUrl: string;
    };
}

interface Props {
    mutatorFn: (data: FormInterface | any) => void;
    loading?: boolean;
    preset?: PresetInterface;
}

const UploadPostForm = ({ mutatorFn, loading, preset = undefined }: Props) => {
    const formProviderValues = useForm<FormInterface>({
        reValidateMode: "onBlur",
    });
    const { handleSubmit, setError, register, setValue, formState } =
        formProviderValues;

    // select - react-hook-form
    const [tag, setTag] = useState("");
    useEffect(() => {
        setValue("tag", tag);
    }, [tag]);

    const _onSubmit = (data: FormInterface) => {
        if (loading) return;
        if (tag === "") {
            setError("tag", { message: "태그를 선택해주세요." });
            return;
        }

        mutatorFn(data);
    };

    // preset data for update or delete
    useEffect(() => {
        if (preset) {
            setValue("title", preset.title);
            setValue("tag", preset.tag);
            setTag(preset.tag);
            setValue("description", preset.description);
        }
    }, []);

    return (
        <section className={s.root}>
            <FormProvider {...formProviderValues}>
                <form
                    className="md:min-w-[50vw] justify-center"
                    onSubmit={handleSubmit(_onSubmit)}
                >
                    <TextInput
                        id="title"
                        label="제목"
                        required
                        placeholder="업로드할 게시글의 제목을 입력해주세요."
                        register={register("title", {
                            required: "필수로 입력해야하는 필드입니다.",
                        })}
                    />

                    <div className={s.selectContainer}>
                        <Label htmlFor="tag">태그</Label>
                        <Select
                            id="tag"
                            className={s.select}
                            ariaLabel="태그"
                            placeholder="태그를 골라주세요."
                            setValue={setTag}
                            required={preset?.tag ? false : true}
                            defaultValue={preset && preset.tag}
                            defaultChecked={Boolean(preset?.tag)}
                        >
                            {["질문", "정보", "후기", "자유"].map((v, i) => (
                                <SelectItem value={v} key={i}>
                                    {v}
                                </SelectItem>
                            ))}
                        </Select>
                        {formState.errors.tag?.message && (
                            <ErrorMessage>
                                {formState.errors.tag?.message}
                            </ErrorMessage>
                        )}
                    </div>

                    <TextareaWithLabel
                        id="description"
                        label="내용"
                        required
                        placeholder="업로드할 게시글의 내용을 입력해주세요."
                        register={register("description", {
                            required: "필수로 입력해야하는 필드입니다.",
                        })}
                    />

                    <Button className={s.button} loading={loading}>
                        업로드하기
                    </Button>
                </form>
            </FormProvider>
        </section>
    );
};

export default UploadPostForm;
