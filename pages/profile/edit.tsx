import type { NextPage } from "next";
import Layout from "../../components/layout";

const EditProfile: NextPage = () => {
    return (
        <Layout title="프로필 수정" hasTabBar>
            <div className="pt-4 px-4 space-y-8">
                <div className="flex items-center space-x-2">
                    <div className="w-20 h-20 rounded-full bg-gray-400 mr-4" />
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

                <div className="space-y-2">
                    <label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-400"
                    >
                        Email address
                    </label>

                    <input
                        id="email"
                        className="appearance-none w-full px-4 py-2 my-2 border border-transparent rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-purple-400 focus:border-purple-400 hover:bg-gray-50 focus:bg-white"
                        type="email"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="phone"
                        className="text-sm font-medium text-gray-400"
                    >
                        Phone number
                    </label>
                    <div className="flex rounded-md shadow-md my-2">
                        <span className="flex items-center justify-center px-4 rounded-l-md border border-r-0 border-transparent bg-gray-50 text-gray-400 select-none">
                            +82
                        </span>
                        <input
                            id="phone"
                            className="appearance-none w-full px-4 py-2 border border-transparent rounded-r-md placeholder-gray-400 focus:outline-none focus:ring-purple-400 focus:border-purple-400 hover:bg-gray-50 focus:bg-white"
                            type="number"
                            required
                        />
                    </div>
                </div>

                <button className="my-4 w-full text-sm font-medium bg-purple-400 hover:bg-purple-700 text-white py-2 px-4 border border-transparent rounded-md shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 focus:outline-none">
                    Update profile
                </button>
            </div>
        </Layout>
    );
};

export default EditProfile;
