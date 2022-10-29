import type { NextPage } from "next";
import Btn from "@components/btn";
import Input from "@components/input";
import Layout from "@components/layout";
import TxtArea from "@components/txtArea";

const NewStream: NextPage = () => {
    return (
        <Layout title="찾아보기" hasTabBar canGoBack>
            <div className="space-y-4 py-10 px-4">
                <Input
                    placeholder="제목을 적어주세요."
                    name="name"
                    label="제목"
                    required
                />

                <Input
                    placeholder="0.00"
                    name="price"
                    type="price"
                    label="상품 가격"
                    required
                />

                <TxtArea
                    label="설명"
                    placeholder="상품 설명을 적어주세요."
                    name="description"
                />

                <Btn text="라이브 커머스 오픈하기" />
            </div>
        </Layout>
    );
};

export default NewStream;
