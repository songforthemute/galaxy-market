import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
// types
import type { Product } from "@prisma/client";
// utils
import { booleanCls, cls, getImgSource } from "@libs/client/util";
// styles
import s from "./UploadItemForm.module.css";
// components
import { Button, Img, Picture } from "@components/Atoms";
import { ImageInput } from "@components/Molecules";
import { UploadItemInputs } from "@components/Organisms";
import useFetch from "@libs/client/useFetch";

interface CloudflareURLInterface {
    status: boolean;
    id: string;
    uploadURL: string;
}

interface CloudflareURLReturnInterface {
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
    name: string;
    price: number;
    option?: string;
    description?: string;
    image?: FileList;
}

interface PresetInterface extends Product {
    user: {
        username: string;
        avatarUrl: string;
    };
}

interface Props {
    mutatorFn: (data: FormInterface | any) => void;
    loading: boolean;
    errors?: {
        type: "name" | "price" | "option" | "description" | "image";
        message: string;
    };
    preset?: PresetInterface;
}

const UploadItemForm = ({
    mutatorFn,
    loading,
    errors,
    preset = undefined,
}: Props) => {
    const { fetcher } = useFetch();
    const formProviderValues = useForm<FormInterface>({
        reValidateMode: "onBlur",
    });
    const { handleSubmit, setError, register, watch, setValue } =
        formProviderValues;

    // Attached Image Priview Configuration
    const attached = watch("image");
    const [imagePreview, setImagePreview] = useState("");
    useEffect(() => {
        if (attached && attached.length > 0) {
            setImagePreview(URL.createObjectURL(attached[0]));
        }
    }, [attached]);

    // submit
    const _onSubmit = async ({
        name,
        description,
        image,
        price,
        option,
    }: FormInterface) => {
        if (loading) return;

        if (image && image.length > 0 && attached) {
            // Req CF URL for upload
            const { uploadURL }: CloudflareURLInterface = await fetcher(
                `/api/files`
            );

            // Form works
            const form = new FormData();
            form.append("file", attached[0], name);

            // Upload Image
            const {
                result: { id },
            }: CloudflareURLReturnInterface = await fetcher(uploadURL, {
                method: "POST",
                body: form,
            });

            mutatorFn({ name, price, option, description, imageUrlId: id });
        } else {
            mutatorFn({ name, price, option, description });
        }
    };

    // submit error configuration
    useEffect(() => {
        if (errors) {
            setError(
                errors.type,
                { message: errors.message },
                { shouldFocus: true }
            );
        }
    }, [errors]);

    // for update api call
    useEffect(() => {
        if (preset) {
            setValue("name", preset.name);
            setValue("price", preset.price);
            setValue("option", preset.option);
            setValue("description", preset.description ?? undefined);

            if (preset.image) {
                setImagePreview(getImgSource(preset.image));
            }
        }
    }, []);

    return (
        <section className={s.root}>
            <FormProvider {...formProviderValues}>
                <form
                    onSubmit={handleSubmit(_onSubmit)}
                    className="md:min-w-[50vw] justify-center"
                >
                    <>
                        <ImageInput
                            id="image"
                            className={cls(
                                s.attach,
                                booleanCls(
                                    imagePreview.length === 0,
                                    s.unattached
                                )
                            )}
                            register={register("image")}
                        >
                            {imagePreview.length > 0 ? (
                                <Img
                                    src={imagePreview}
                                    alt="preview"
                                    className={s.attachment}
                                    priority={true}
                                    directSrc
                                />
                            ) : (
                                <Picture strokeWidth={1} w={14} h={14} />
                            )}
                        </ImageInput>
                    </>

                    <UploadItemInputs />

                    <Button
                        loading={loading}
                        className="rounded-lg w-full mt-8"
                    >
                        업로드하기
                    </Button>
                </form>
            </FormProvider>
        </section>
    );
};

export default UploadItemForm;
