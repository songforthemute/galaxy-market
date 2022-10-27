import type { NextPage } from "next";
import Btn from "@components/btn";
import Input from "@components/input";
import Layout from "@components/layout";

const EditProfile: NextPage = () => {
    return (
        <Layout title="프로필 수정" hasTabBar canGoBack>
            <div className="p-4 space-y-8">
                <div className="flex items-center space-x-2">
                    <div className="w-20 h-20 rounded-full bg-gray-400 mr-4 cursor-pointer" />
                    <label
                        htmlFor="photo"
                        className="cursor-pointer p-2 border border-gray-400 text-gray-400 rounded-md shadow-md font-medium
                hover:text-purple-400 hover:border-purple-400 focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 transition-all"
                    >
                        Change Photo
                        <input
                            id="photo"
                            type="file"
                            className="hidden"
                            accept="image/*"
                        />
                    </label>
                </div>

                <Input
                    label="이메일 주소"
                    name="email"
                    type="email"
                    disabled
                    required
                />

                <Input
                    label="닉네임"
                    name="username"
                    placeholder="닉네임을 적어주세요."
                    required
                />

                <Input
                    label="전화번호"
                    name="phone"
                    type="phone"
                    placeholder="12345678"
                    required
                />

                <Btn text="프로필 업데이트" />
            </div>
        </Layout>
    );
};

export default EditProfile;
