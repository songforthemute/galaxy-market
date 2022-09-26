import type { NextPage } from "next";
import Btn from "../../components/btn";
import Layout from "../../components/layout";
import UserCard from "../../components/userCard";

const ItemDetail: NextPage = () => {
    return (
        <Layout title="상품 상세" hasTabBar canGoBack>
            <div className="p-4">
                <div className="mb-8">
                    <div className="h-96 bg-slate-400 mb-4" />

                    <UserCard
                        text="프로필 보기 &rarr;"
                        username="조이"
                        type="profile"
                        href="/profile"
                        hasBorder
                    />

                    <div className="mt-8 space-y-4">
                        <h1 className="text-3xl font-bold text-black">
                            아이폰 14 프로 맥스
                        </h1>
                        <div className="text-2xl mt-1 text-gray-700">
                            123,456원
                        </div>
                        <p className="text-base mt-4 text-gray-700">
                            iPhone을 다루는 완전히 새로운 방법. 생명을 구할 수
                            있도록 설계된 새로운 핵심 안전 기능. 압도적인
                            디테일을 자랑하는 혁신적인 48MP 카메라. 이 모든 걸
                            가능케 하는 궁극의 스마트폰 칩. 새롭게 선보이는
                            Dynamic Island. 하드웨어와 소프트웨어 그리고 그
                            사이의 모든 것을 아우르는 진정 Apple 다운
                            혁신입니다. 음악, 스포츠 점수, FaceTime 등 다양한
                            정보들을 띄워주기 때문에 하던 일을 멈추지 않고도
                            중요한 정보들을 확인할 수 있죠.
                        </p>
                        <div className="flex items-center justify-between space-x-2 my-4">
                            <Btn text={"판매자에게 연락하기"} />
                            <button className="p-2 flex items-center justify-center text-gray-400 rounded-md focus:text-red-400 focus:outline-none hover:text-red-100 transition-colors">
                                <svg
                                    className="h-6 w-6 "
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="">
                    <h2 className="text-xl font-medium text-gray-700">
                        유사한 상품
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        {[1, 2, 3, 4, 5, 6].map((_, i) => (
                            <div key={i} className="">
                                <div className="h-56 w-56 mb-2 bg-slate-400" />
                                <h3 className="text-sm font-semibold text-gray-700 -mb-1">
                                    아이폰 SE3
                                </h3>
                                <span className="text-sm font-medium text-gray-400">
                                    ₩ 10,000
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ItemDetail;
