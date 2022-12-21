import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// types
import type { Product } from "@prisma/client";
import type { MouseEvent } from "react";
// utils
import { convertPrice } from "@libs/client/util";
// styles
import s from "./ReviewForm.module.css";
// components
import { Scoring, TextareaWithLabel } from "@components/Molecules";
import {
    Button,
    ErrorMessage,
    Label,
    Select,
    SelectItem,
} from "@components/Atoms";

interface FormInterface {
    productId?: number;
    review: string;
    star: number;
}

interface Props {
    loading?: boolean;
    soldoutList?: Product[];
    mutatorFn: (data: FormInterface | any) => void;
}

const ReviewForm = ({ loading = false, soldoutList, mutatorFn }: Props) => {
    const { register, handleSubmit, setValue, formState, setError } =
        useForm<FormInterface>({
            reValidateMode: "onBlur",
        });

    // for select
    const [productId, setProductId] = useState<number | undefined>();
    useEffect(() => {
        setValue("productId", productId);
    }, [productId]);

    // for scoring
    const [score, setScore] = useState<number | undefined>();
    const _onClickScore = (e: MouseEvent<HTMLButtonElement>) => {
        const clicked = Number(e.currentTarget.dataset["score"]);

        if (score === clicked) {
            setScore(0);
            setValue("star", 0);
        } else {
            setScore(clicked);
            setValue("star", clicked);
        }
    };

    const _onSubmit = (data: FormInterface) => {
        if (loading) return;
        if (data.productId === undefined) {
            setError("productId", { message: "리뷰할 상품을 선택해주세요." });
            return;
        }

        if (data.star === undefined) {
            setError("star", { message: "리뷰의 별점을 매겨주세요." });
            return;
        }

        mutatorFn(data);
    };

    return (
        <section className={s.root}>
            <form
                className="w-full md:max-w-[50vw] justify-center"
                onSubmit={handleSubmit(_onSubmit)}
            >
                <div className={s.selectContainer}>
                    <Label htmlFor="product">상품 선택</Label>
                    <Select
                        className={s.select}
                        id="product"
                        required
                        ariaLabel="상품 선택"
                        placeholder="후기를 남길 상품을 선택해주세요."
                        setValue={setProductId}
                    >
                        {soldoutList?.map((v) => (
                            <SelectItem key={v.id} value={`${v.id}`}>
                                {`${v.name} (${v.option}, ₩ ${convertPrice(
                                    v.price
                                )})`}
                            </SelectItem>
                        ))}
                    </Select>

                    {formState.errors.productId?.message && (
                        <ErrorMessage className={s.errorMessage}>
                            {formState.errors.productId?.message}
                        </ErrorMessage>
                    )}
                </div>

                <div className={s.scoreContainer}>
                    <Label>별점</Label>
                    <Scoring score={score} onClick={_onClickScore} />

                    {formState.errors.star?.message && (
                        <ErrorMessage className={s.errorMessage}>
                            {formState.errors.star?.message}
                        </ErrorMessage>
                    )}
                </div>

                <TextareaWithLabel
                    register={register("review", {
                        required: "리뷰 내용을 입력해주세요.",
                    })}
                    id="review"
                    label="후기"
                    required
                    placeholder="자세한 후기를 입력해주세요."
                />

                <Button className="w-full rounded-lg mt-4" loading={loading}>
                    리뷰 업로드하기
                </Button>
            </form>
        </section>
    );
};

export default ReviewForm;
