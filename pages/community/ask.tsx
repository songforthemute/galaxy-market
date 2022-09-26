import type { NextPage } from "next";
import Badge from "../../components/badge";
import Btn from "../../components/btn";
import Layout from "../../components/layout";
import TxtArea from "../../components/txtArea";

const NewAsking: NextPage = () => {
    return (
        <Layout title="질문하기" hasTabBar canGoBack>
            <form className="p-4">
                <Badge text="궁금해요" />

                <TxtArea
                    name="ask"
                    label="질문하기"
                    placeholder="궁금한 내용을 적어주세요."
                />

                <Btn text="질문 등록하기" />
            </form>
        </Layout>
    );
};

export default NewAsking;
