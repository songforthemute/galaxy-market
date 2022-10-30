import type { NextPage } from "next";
import Btn from "@components/btn";
import Input from "@components/input";
import Layout from "@components/layout";
import { useForm } from "react-hook-form";
import ErrorMessage from "@components/errMessage";
import { useRouter } from "next/router";
import React, { ReactEventHandler, useState } from "react";
import { cls } from "@libs/client/util";

interface SearchOptsForm {
    name: string;
    lowestPrice?: number;
    highestPrice?: number;
}

const SearchOpts: NextPage = () => {
    const router = useRouter();
    const [dropdownOpen, setdropdownOpen] = useState(false);
    const [dropdownValue, setDropdownValue] = useState("최신등록순");
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
            `/search?name=${name}&lowestPrice=${lowestPrice}&highestPrice=${highestPrice}&sort=${dropdownValue}`,
            `/search`
        );
    };

    const _onDropDownClick = (e: React.MouseEvent<HTMLDivElement>) => {
        setDropdownValue((e.target as HTMLDivElement).innerHTML);
        setdropdownOpen(false);
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

                {/* 드롭다운 */}
                <label
                    // htmlFor={name}
                    className="text-sm font-medium text-slate-400 block mb-1"
                >
                    {"정렬 옵션"}
                </label>

                <div
                    onClick={() => setdropdownOpen(!dropdownOpen)}
                    className="rounded-md shadow-md relative flex items-center my-2 hover:cursor-pointer hover:bg-slate-100 transition-all"
                >
                    <div className="px-4 py-2 overflow-hidden rounded-full flex justify-center items-center">
                        {dropdownValue}
                    </div>

                    <div
                        className={cls(
                            "absolute left-0 z-40 mt-2 w-full rounded border-[.5px] border-light bg-white py-5 shadow-card transition-all",
                            dropdownOpen
                                ? `top-full opacity-100 visible`
                                : "top-[110%] invisible opacity-0"
                        )}
                    >
                        {[
                            "최신등록순",
                            "높은가격순",
                            "낮은가격순",
                            // "좋아요순",
                        ].map((item, i) => (
                            <div
                                key={i}
                                onClick={_onDropDownClick}
                                className="block cursor-pointer py-2 px-5 text-sm font-medium hover:bg-opacity-5 hover:text-purple-400 transition-all"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                <Btn text="입력한 조건으로 검색하기" />
            </form>
        </Layout>
    );
};

export default SearchOpts;
