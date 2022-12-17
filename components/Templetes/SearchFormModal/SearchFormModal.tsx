import { useForm } from "react-hook-form";
// styles
import s from "./SearchFormModal.module.css";
// components
import {
    Button,
    ErrorMessage,
    Label,
    Modal,
    Select,
    SelectItem,
} from "@components/Atoms";
import { NumberInput, TextInput } from "@components/Molecules";
import { useEffect, useState } from "react";

interface FormInterface {
    name: string;
    lowestPrice?: number;
    highestPrice?: number;
    sort?: string;
}

interface Props {
    onClose: () => void;
    onSearch: (data?: FormInterface | any) => void;
}

const SearchFormModal = ({ onClose, onSearch }: Props) => {
    const { register, handleSubmit, setError, formState, setValue } =
        useForm<FormInterface>({
            reValidateMode: "onBlur",
        });
    // select
    const [sort, setSort] = useState("");
    useEffect(() => {
        setValue("sort", sort);
    }, [sort]);

    const _onSubmit = (data: FormInterface) => {
        if (sort === "") {
            setError("sort", { message: "정렬 옵션을 선택해주세요." });
            return;
        }

        if (
            data.lowestPrice &&
            data.highestPrice &&
            data.lowestPrice > data.highestPrice
        ) {
            setError(
                "highestPrice",
                {
                    message: "최고가는 최저가보다 커야합니다.",
                },
                { shouldFocus: true }
            );
            return;
        }

        onSearch({ ...data });
    };

    return (
        <Modal onClose={onClose}>
            <form className={s.root} onSubmit={handleSubmit(_onSubmit)}>
                <TextInput
                    id="name"
                    label="상품명"
                    required
                    placeholder="검색할 상품명을 입력해주세요."
                    register={register("name", {
                        required: "검색할 상품의 이름을 입력해주세요.",
                        minLength: {
                            value: 2,
                            message: "검색어를 2자 이상으로 입력해주세요.",
                        },
                    })}
                />
                <NumberInput
                    label="최저가"
                    heading="₩"
                    id="lowestPrice"
                    placeholder="검색할 상품의 최저 가격을 설정해주세요."
                    register={register("lowestPrice", {
                        min: {
                            value: 0,
                            message: "최저가는 0보다 커야합니다.",
                        },
                    })}
                />
                <NumberInput
                    label="최고가"
                    heading="₩"
                    id="highestPrice"
                    placeholder="검색할 상품의 최고 가격을 설정해주세요."
                    register={register("highestPrice", {
                        min: {
                            value: 0,
                            message: "최고가는 0보다 커야합니다.",
                        },
                    })}
                />

                <div className={s.sortContainer}>
                    <Label htmlFor="sort">태그</Label>
                    <Select
                        id="sort"
                        className={s.select}
                        ariaLabel="정렬 옵션"
                        placeholder="정렬 순서를 선택해주세요."
                        setValue={setSort}
                        required={true}
                    >
                        {["최신등록순", "높은가격순", "낮은가격순"].map(
                            (v, i) => (
                                <SelectItem value={v} key={i}>
                                    {v}
                                </SelectItem>
                            )
                        )}
                    </Select>
                    {formState.errors.sort?.message && (
                        <ErrorMessage>
                            {formState.errors.sort?.message}
                        </ErrorMessage>
                    )}
                </div>

                <Button className={s.button}>검색하기</Button>
            </form>
        </Modal>
    );
};

export default SearchFormModal;
