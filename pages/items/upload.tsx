import type { NextPage } from "next";

const Upload: NextPage = () => {
    return (
        <div className="px-4 py-16">
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

                    <input type="file" className="hidden" accept="image/*" />
                </label>
            </div>
            <div className="my-4">
                <label
                    htmlFor="price"
                    className="text-sm font-medium text-gray-400 block mb-1"
                >
                    Price
                </label>
                <div className="rounded-md relative flex items-center">
                    <div className="absolute left-0 pl-4 flex items-center justify-center pointer-events-none">
                        <span className="text-gray-400 text-base">$</span>
                    </div>
                    <input
                        id="price"
                        type="text"
                        placeholder="0.00"
                        className="appearance-none w-full pl-8 px-4 py-2 my-2 border border-transparent rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-purple-400 focus:border-purple-400 hover:bg-gray-50 focus:bg-white"
                    />
                    <div className="absolute right-0 pr-4 flex items-center pointer-events-none">
                        <span className="text-gray-400">USD</span>
                    </div>
                </div>
            </div>
            <div>
                <label
                    className="text-sm font-medium text-gray-400 block mb-1"
                    htmlFor=""
                >
                    Description
                </label>
                <textarea
                    rows={4}
                    className="mt-1 shadow-md w-full rounded-md border border-transparent
                    focus:ring-purple-400 focus:border-purple-400"
                />
            </div>
            <button className="w-full my-4 text-sm font-medium bg-purple-400 hover:bg-purple-700 text-white py-2 px-4 border border-transparent rounded-md shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 focus:outline-none">
                Upload product
            </button>
        </div>
    );
};

export default Upload;
