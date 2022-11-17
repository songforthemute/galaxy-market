const SkeletonItem = () => {
    return (
        <div className="flex flex-1 p-4 justify-between transition-all animate-pulse">
            <div className="flex space-x-4">
                <div className="w-20 h-20 aspect-square bg-slate-400 rounded-md" />

                <div className="w-60 py-1.5 flex flex-col space-y-2">
                    <h3 className="w-full h-full rounded-md bg-slate-400" />
                    <div className="w-1/3 h-2/3 rounded-md bg-slate-400" />
                    <div className="w-1/2 h-full rounded-md bg-slate-400" />
                </div>
            </div>

            <div className="flex items-end justify-end space-x-4">
                <div className="w-16 h-8 py-1.5 flex items-center space-x-1">
                    <h3 className="w-full h-3/4 rounded-md bg-slate-400" />
                </div>
            </div>
        </div>
    );
};

export default SkeletonItem;
