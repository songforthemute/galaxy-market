import type { NextPage } from "next";
import Btn from "@components/btn";
import Layout from "@components/layout";
import TxtArea from "@components/txtArea";
import Input from "@components/input";

const NewPost: NextPage = () => {
    return (
        <Layout title="질문하기" hasTabBar canGoBack>
            <form className="p-4">
                <Input
                    name="title"
                    label="제목"
                    required
                    placeholder="제목을 적어주세요."
                />

                <TxtArea
                    name="description"
                    label="내용"
                    placeholder="궁금한 내용을 적어주세요."
                    required
                />

                <Btn text="질문 등록하기" />
            </form>
        </Layout>
    );
};

export default NewPost;
