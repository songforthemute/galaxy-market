const SkeletonReviews = () => {
    return (
        <>
            <div className="flex flex-1 flex-col py-4 space-y-2 animate-pulse transition-all">
                <div className="flex space-x-4">
                    <div className="w-12 h-12 aspect-square bg-slate-400 rounded-full" />

                    <div className="w-32 py-1.5 flex flex-col space-y-2">
                        <h3 className="w-full h-full rounded-md bg-slate-400" />
                        <div className="w-2/3 h-full rounded-md bg-slate-400" />
                    </div>
                </div>

                <div className="w-1/3 py-1.5 flex flex-col space-y-2">
                    <h3 className="w-full h-full py-2 rounded-md bg-slate-400" />
                </div>

                <div className="flex space-x-4">
                    <div className="w-12 h-12 aspect-square bg-slate-400 rounded-md" />

                    <div className="w-48 py-1.5 flex flex-col space-y-2">
                        <h3 className="w-1/2 h-full rounded-md bg-slate-400" />
                        <div className="w-full h-full rounded-md bg-slate-400" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SkeletonReviews;
