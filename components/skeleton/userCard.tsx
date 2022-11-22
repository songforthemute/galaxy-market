import { cls } from "@libs/client/util";

interface skeletonUserCardInterface {
    isLarge?: boolean;
}

const SkeletonUserCard = ({ isLarge = false }: skeletonUserCardInterface) => {
    return (
        <div className="p-4 flex items-center space-x-4 mt-0.5 animate-pulse">
            <a className="flex items-center space-x-4">
                <div
                    className={cls(
                        "aspect-square rounded-full bg-slate-400",
                        isLarge ? "w-16 h-16" : "w-12 h-12"
                    )}
                />

                <div className="space-y-1.5">
                    <div
                        className={cls(
                            "rounded-md bg-slate-400",
                            isLarge ? "w-32 h-6" : "w-28 h-5"
                        )}
                    />

                    <div className="bg-slate-400 rounded-md w-20 h-2.5" />
                </div>
            </a>
        </div>
    );
};

export default SkeletonUserCard;
