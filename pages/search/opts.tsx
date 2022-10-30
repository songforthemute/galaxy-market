import type { NextPage } from "next";
import Btn from "@components/btn";
import Input from "@components/input";
import Layout from "@components/layout";
import { useForm } from "react-hook-form";
import ErrorMessage from "@components/errMessage";
import { useRouter } from "next/router";

interface SearchOptsForm {
    name: string;
    lowestPrice?: number;
    highestPrice?: number;
}

const SearchOpts: NextPage = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        setFocus,
        setError,
        formState: { errors },
    } = useForm<SearchOptsForm>({ reValidateMode: "onBlur" });

    const _onValid = ({ name, lowestPrice, highestPrice }: SearchOptsForm) => {
        if (lowestPrice && highestPrice && lowestPrice > highestPrice) {
            setFocus("highestPrice");
            setError("highestPrice", {
                message: "최고가는 최저가보다 커야합니다.",
            });
            return;
        }

        router.push(
            `/search?name=${name}&lowestPrice=${lowestPrice}&highestPrice=${highestPrice}`,
            `/search`
        );
    };

    return (
        <Layout title="찾아보기" hasTabBar canGoBack>
            <form
                onSubmit={handleSubmit(_onValid)}
                className="space-y-4 py-10 px-4"
            >
                <Input
                    register={register("name", {
                        required: {
                            value: true,
                            message: "검색어를 입력해주세요.",
                        },
                        minLength: {
                            value: 2,
                            message: "검색어를 2자 이상으로 입력해주세요.",
                        },
                    })}
                    placeholder="검색할 상품의 이름을 적어주세요."
                    name="name"
                    label="제목"
                    isCheckOk={!errors?.name}
                    required
                />
                {errors.name && <ErrorMessage text={errors.name.message} />}

                <Input
                    register={register("lowestPrice", {
                        min: {
                            value: 0,
                            message: "최저가는 0보다 커야합니다.",
                        },
                    })}
                    placeholder="0.00"
                    name="lowestPrice"
                    type="price"
                    label="최저가"
                />
                {errors.lowestPrice && (
                    <ErrorMessage text={errors.lowestPrice.message} />
                )}

                <Input
                    register={register("highestPrice", {
                        min: {
                            value: 0,
                            message: "최고가는 0보다 커야합니다.",
                        },
                    })}
                    placeholder="0.00"
                    name="highestPrice"
                    type="price"
                    label="최고가"
                />
                {errors.highestPrice && (
                    <ErrorMessage text={errors.highestPrice.message} />
                )}

                <Btn text="입력한 조건으로 검색하기" />
            </form>
        </Layout>
    );
};

export default SearchOpts;
