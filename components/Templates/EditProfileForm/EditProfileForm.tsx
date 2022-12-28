import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// types
import type { User } from "@prisma/client";
// utils
import { getImgSource, useFocusEvent, useFetch } from "@libs/client";
// styles
import s from "./EditProfileForm.module.css";
// components
import { ImageInput, NumberInput, TextInput } from "@components/Molecules";
import { Button, Img } from "@components/Atoms";

interface CloudflareURLInterface {
    status: boolean;
    id: string;
    uploadURL: string;
}
interface CloudflareURLResponseInterface {
    errors?: any[];
    messages?: any[];
    success: boolean;
    result: {
        id: string;
        filename: string;
        uploaded: string;
        requireSignedURLs: boolean;
        variants: string[];
    };
}
interface FormInterface {
    avatar?: FileList;
    phone?: string;
    username?: string;
}

interface Props {
    loading?: boolean;
    mutatorFn: (data?: FormInterface | any) => void;
    errors?: {
        type: "avatar" | "phone" | "username";
        message: string;
    };
    user?: User;
}

const EditProfileForm = ({
    loading = false,
    mutatorFn,
    errors,
    user,
}: Props) => {
    const { register, handleSubmit, setValue, setError, watch } =
        useForm<FormInterface>({
            reValidateMode: "onBlur",
        });

    const { fetcher } = useFetch();
    const { onKeyDownEnter } = useFocusEvent(); // for focusable component

    const previewUrl = watch("avatar");
    const [preview, setPreview] = useState("");

    const _onSubmit = async ({ avatar, phone, username }: FormInterface) => {
        if (loading) return;

        if (errors) {
            setError(errors.type, { message: errors.message });
            return;
        }

        if (avatar && avatar.length > 0 && user) {
            const { uploadURL }: CloudflareURLInterface = await fetcher(
                `/api/files`
            );

            const form = new FormData();
            form.append("file", avatar[0], String(user?.id));

            const {
                result: { id },
            }: CloudflareURLResponseInterface = await fetcher(uploadURL, {
                method: "POST",
                body: form,
            });

            mutatorFn({ username, phone, avatarUrlId: id });
        } else {
            mutatorFn({ username, phone });
        }
    };

    // set preview
    useEffect(() => {
        if (previewUrl && previewUrl.length > 0) {
            const imageUrl = URL.createObjectURL(previewUrl[0]);
            setPreview(imageUrl);
        }
    }, [previewUrl]);

    // initialize preset
    useEffect(() => {
        if (user?.username) setValue("username", user.username);
        if (user?.phone) setValue("phone", user.phone);
        if (user?.avatarUrl) setPreview(getImgSource(user.avatarUrl));
    }, [user, setValue]);

    return (
        <section className={s.root}>
            <form
                className="md:min-w-[50vw] justify-center"
                onSubmit={handleSubmit(_onSubmit)}
            >
                <div className={s.container}>
                    {preview.length > 0 ? (
                        <Img
                            alt="avatar"
                            priority
                            src={preview}
                            directSrc
                            className={s.preview}
                        />
                    ) : (
                        <div className={s.empty} />
                    )}

                    <ImageInput id="avatar" register={register("avatar")}>
                        <span tabIndex={0} onKeyDown={onKeyDownEnter}>
                            프로필 사진 바꾸기
                        </span>
                    </ImageInput>
                </div>

                <TextInput
                    placeholder={user?.email}
                    label="이메일"
                    type="email"
                    id="email"
                    disabled
                />
                <TextInput
                    register={register("username", {
                        required: true,
                        minLength: {
                            message: "2~12자 사이로 입력해주세요.",
                            value: 2,
                        },
                        maxLength: {
                            message: "2~12자 사이로 입력해주세요.",
                            value: 12,
                        },
                        pattern: {
                            value: /^[a-zA-Zㄱ-힣0-9|s]*$/,
                            message: "특수문자는 사용할 수 없습니다.",
                        },
                    })}
                    placeholder="사용하실 닉네임을 입력해주세요."
                    label="닉네임"
                    id="username"
                />
                <NumberInput
                    register={register("phone")}
                    placeholder="특수문자 '-' 없이 입력해주세요."
                    label="전화번호"
                    type="tel"
                    heading="010"
                    id="phone"
                />

                <Button type="submit" className={s.button} loading={loading}>
                    프로필 수정하기
                </Button>
            </form>
        </section>
    );
};

export default EditProfileForm;
