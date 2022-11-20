import { useRouter } from "next/router";
import { useEffect, useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
// type
import type { NextPage } from "next";
// custom hooks
import useUser from "@libs/client/useUser";
import useMutation from "@libs/client/useMutation";
// utils
import { fetcher, getImgSource } from "@libs/client/util";
// components
import Layout from "@components/layout";
import Btn from "@components/btn";
import Input from "@components/input";

// dynamic imports
const Image = dynamic(() => import("next/image"), {
    ssr: false,
    suspense: true,
});
const ErrorMessage = dynamic(() => import("@components/errMessage"), {
    ssr: false,
});

// interfaces
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

// Page
const EditProfile: NextPage = () => {
    const router = useRouter();
    const { user } = useUser();

    // request edited data
    const [editProfile, { data, loading }] = useMutation<EditProfileReturn>({
        url: "/api/users/me",
        method: "PUT",
    });

    // edit form
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        watch,
        formState: { errors },
    } = useForm<EditProfileForm>({ reValidateMode: "onBlur" });

    // avatar thumbnail
    const avatarUrl = watch("avatarUrl");
    const [avatarUrlPreview, setAvatarUrlPreview] = useState("");

    // initialize form
    useEffect(() => {
        if (user?.phone) setValue("phone", user.phone);
        if (user?.username) setValue("username", user.username);
        if (user?.avatarUrl) setAvatarUrlPreview(getImgSource(user.avatarUrl)!);
    }, [user]);

    // submit form
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
            const { uploadURL }: CloudflareURLInterface = await fetcher(
                `/api/files`
            );

            // create form for data
            const form = new FormData();
            form.append("file", avatarUrl[0], String(user.id));

            // upload img
            const {
                result: { id },
            }: CloudflareURLResponseInterface = await fetcher(uploadURL, {
                method: "POST",
                body: form,
            });

            editProfile({ phone, username, avatarUrlId: id });
        } else {
            editProfile({ phone, username });
        }
    };

    // set preview thumbnail img
    useEffect(() => {
        if (avatarUrl && avatarUrl.length > 0) {
            const imgUrl = URL.createObjectURL(avatarUrl[0]);
            setAvatarUrlPreview(imgUrl);
        }
    }, [avatarUrl]);

    // already exist phone number
    useEffect(() => {
        if (data && !data.status && data.error) {
            setError("phone", { message: data.error });
        }
    }, [data, setError]);

    // if success
    useEffect(() => {
        if (data && data.status) {
            router.push("/profile");
        }
    }, [data, router]);

    return (
        <Layout title="프로필 수정" canGoBack>
            <form onSubmit={handleSubmit(_onValid)} className="p-4 space-y-8">
                <div className="flex items-center space-x-2">
                    {avatarUrlPreview.length > 0 ? (
                        <Suspense
                            fallback={
                                <div className="w-24 h-24 rounded-full bg-slate-400 mr-4" />
                            }
                        >
                            <div className="relative rounded-full cursor-pointer mr-4 p-12">
                                <Image
                                    src={avatarUrlPreview}
                                    alt="avatar"
                                    className="rounded-full"
                                    layout="fill"
                                    objectFit="scale-down"
                                    quality={100}
                                    priority
                                />
                            </div>
                        </Suspense>
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
