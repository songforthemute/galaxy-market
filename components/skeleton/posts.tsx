const SkeletonPosting = () => {
    return (
        <div className="m-4 space-y-2.5 flex flex-col items-start animate-pulse">
            <div className="w-1/5 max-w-[8rem] h-6 bg-slate-400 rounded-full" />
            <div className="w-full h-20 bg-slate-400 rounded-xl" />

            <div className="w-1/3 h-6 px-4 space-x-4 bg-slate-400 rounded-full" />
        </div>
    );
};

export default SkeletonPosting;
