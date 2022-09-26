import type { NextPage } from "next";
import Btn from "../../components/btn";
import Input from "../../components/input";
import Layout from "../../components/layout";
import TxtArea from "../../components/txtArea";

const Upload: NextPage = () => {
    return (
        <Layout title="상품 등록" hasTabBar canGoBack>
            <div className="px-4 pt-10">
                <div>
                    <label
                        className="w-full h-48 flex items-center justify-center
            border-2 border-dashed border-gray-700 py-8 rounded-md
            text-gray-700 hover:text-purple-400 hover:border-purple-400 transition-colors cursor-pointer"
                    >
                        <svg
                            className="h-12 w-12"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                        />
                    </label>
                </div>

                <div className="space-y-8 mt-8 mb-4">
                    <Input
                        name="name"
                        label="상품명"
                        required
                        placeholder="상품명을 입력해주세요."
                    />

                    <Input
                        name="price"
                        label="가격"
                        type="price"
                        required
                        placeholder="0"
                    />

                    <TxtArea
                        label="상품 설명"
                        placeholder="상품 설명을 입력해주세요."
                        name="description"
                    />
                </div>

                <Btn text="상품 등록" ㅋ />
            </div>
        </Layout>
    );
};

export default Upload;
