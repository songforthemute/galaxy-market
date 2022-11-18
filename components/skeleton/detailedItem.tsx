const SkeletonDetailedItem = () => {
    return (
        <div className="transition-all animate-pulse">
            <div className="w-full h-32 mt-8 space-y-4">
                <h1 className="w-1/3 h-1/3 bg-slate-400 rounded-md" />

                <div className="w-1/4 h-1/6 bg-slate-400 rounded-md"></div>
                <p className="w-1/2 h-1/2 bg-slate-400 rounded-md"></p>

                <div className="flex items-center justify-between space-x-2 my-4">
                    <button className="w-full my-4 bg-slate-400 font-medium text-white py-4 px-4 border border-transparent rounded-md shadow-md text-sm" />

                    {/* Like Toggle Btn */}
                    <button className="p-2 flex items-center justify-center text-slate-400">
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
    );
};

export default SkeletonDetailedItem;
