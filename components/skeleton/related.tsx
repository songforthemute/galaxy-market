const SkeletonRelated = () => {
    return (
        <div className="mt-20 p-4 transition-all animate-pulse">
            <h2 className="text-xl font-medium text-slate-700">유사한 상품</h2>

            <div className="w-56 h-24 mt-4 space-y-2">
                <div className="w-full aspect-square bg-slate-400 rounded-md" />
                <h3 className="w-2/3 h-1/5 bg-slate-400 rounded-md" />
                <div className="w-1/2 h-1/6 bg-slate-400 rounded-md" />
            </div>
        </div>
    );
};

export default SkeletonRelated;
