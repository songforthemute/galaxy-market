import { cls } from "@libs/client/util";

interface skeletonUserCardInterface {
    isLarge?: boolean;
}

const SkeletonUserCard = ({ isLarge = false }: skeletonUserCardInterface) => {
    return (
        <div className="flex items-center space-x-4 mt-2 animate-pulse">
            <a className="flex items-center space-x-4">
                <div
                    className={cls(
                        "aspect-square rounded-full bg-slate-400",
                        isLarge ? "w-16 h-16" : "w-12 h-12"
                    )}
                />

                <div className="space-y-1">
                    <p
                        className={cls(
                            isLarge
                                ? "text-md font-semibold text-slate-700"
                                : "font-medium text-slate-700"
                        )}
                    >
                        유저
                    </p>
                    <p className="font-medium text-xs text-slate-400">
                        프로필보기 →
                    </p>
                </div>
            </a>
        </div>
    );
};

export default SkeletonUserCard;
