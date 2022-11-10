import type { NextPage } from "next";
import Btn from "@components/btn";
import Input from "@components/input";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ErrorMessage from "@components/errMessage";
import useMutation from "@libs/client/useMutation";
import { useRouter } from "next/router";
import { fetcher, getImgSource } from "@libs/client/util";

interface EditProfileForm {
    avatarUrl?: FileList;
    username?: string;
    phone?: string;
}

interface EditProfileReturn {
    status: boolean;
    error?: string;
}

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

const EditProfile: NextPage = () => {
    const { user } = useUser();
    const router = useRouter();
    const [editProfile, { data, loading, error }] =
        useMutation<EditProfileReturn>({
            url: "/api/users/me",
            method: "PUT",
        });
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        watch,
        formState: { errors },
    } = useForm<EditProfileForm>({ reValidateMode: "onBlur" });
    const avatarUrl = watch("avatarUrl");
    const [avatarUrlPreview, setAvatarUrlPreview] = useState("");

    // form initialization
    useEffect(() => {
        if (user?.phone) setValue("phone", user.phone);
        if (user?.username) setValue("username", user.username);
        if (user?.avatarUrl) setAvatarUrlPreview(getImgSource(user.avatarUrl)!);
    }, [user]);

    const _onValid = async ({
        phone,
        username,
        avatarUrl,
    }: EditProfileForm) => {
        if (loading) return;

        if (errors?.phone || errors?.username) {
            console.log("error!", errors);
            return;
        }

        if (avatarUrl && avatarUrl.length > 0 && user) {
            // request Cloudflare url for upload
            const { uploadURL }: CloudflareURLInterface = await (
                await fetch(`/api/files`)
            ).json();

            // create form
            const form = new FormData();
            form.append("file", avatarUrl[0], String(user.id));

            // upload img
            const {
                result: { id },
            }: CloudflareURLResponseInterface = await (
                await fetch(uploadURL, {
                    method: "POST",
                    body: form,
                })
            ).json();

            editProfile({ phone, username, avatarUrlId: id });
        } else {
            editProfile({ phone, username });
        }
    };

    // 이미지 경로 : https://imagedelivery.net/KROfMzVr3PdBgIfU74ol-g/${avatarUrl}/public

    // 프로필 변경 미리보기
    useEffect(() => {
        if (avatarUrl && avatarUrl.length > 0) {
            const img = avatarUrl[0];
            const imgUrl = URL.createObjectURL(img);
            setAvatarUrlPreview(imgUrl);
        }
    }, [avatarUrl]);

    // 이미 존재하는 전화번호
    useEffect(() => {
        if (data && !data.status && data.error) {
            setError("phone", { message: data.error });
        }
    }, [data, setError]);

    // 성공시 프로파일 메인으로 이동
    useEffect(() => {
        if (data && data.status) {
            router.push("/profile");
        }
    }, [data, router]);

    return (
        <Layout title="프로필 수정" hasTabBar canGoBack>
            <form onSubmit={handleSubmit(_onValid)} className="p-4 space-y-8">
                <div className="flex items-center space-x-2">
                    {avatarUrlPreview.length > 0 ? (
                        <img
                            src={avatarUrlPreview}
                            alt="avatar"
                            className="w-24 h-24 rounded-full bg-slate-400 mr-4 cursor-pointer"
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-slate-400 mr-4" />
                    )}

                    <label
                        htmlFor="photo"
                        className="cursor-pointer p-2 border border-slate-400 text-slate-400 rounded-md shadow-md font-medium
                hover:text-purple-400 hover:border-purple-400 focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 transition-all"
                    >
                        프로필 사진 바꾸기
                        <input
                            {...register("avatarUrl")}
                            id="photo"
                            type="file"
                            className="hidden"
                            accept="image/*"
                        />
                    </label>
                </div>

                <Input
                    placeholder={user?.email}
                    label="이메일 주소"
                    name="email"
                    type="email"
                    disabled
                    required
                    isCheckOk={true}
                />

                <Input
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
                    label="닉네임"
                    name="username"
                    placeholder="닉네임을 적어주세요."
                    required
                    isCheckOk={!errors?.username}
                />
                {errors?.username && (
                    <ErrorMessage text={errors.username.message} />
                )}

                <Input
                    register={register("phone", {
                        minLength: {
                            value: 6,
                            message: "정확한 번호를 입력해주세요",
                        },
                    })}
                    label="전화번호"
                    name="phone"
                    type="phone"
                    placeholder="특수문자 '-' 없이 이어서 입력해주세요."
                />
                {errors?.phone && <ErrorMessage text={errors.phone.message} />}

                <Btn
                    text={loading ? "업데이트중이에요" : "프로필 업데이트하기"}
                />
            </form>
        </Layout>
    );
};

export default EditProfile;
