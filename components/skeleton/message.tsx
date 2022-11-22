import { cls } from "@libs/client/util";

interface MessagesProps {
    isReverse?: boolean;
}

const SkeletonMessageBody = ({ isReverse = false }: MessagesProps) => {
    return (
        <div
            className={cls(
                "flex space-x-2 items-center animate-pulse",
                isReverse ? "flex-row-reverse space-x-reverse" : ""
            )}
        >
            <div className="rounded-full w-8 aspect-square bg-slate-400" />

            <div className="w-40 h-10 bg-slate-400 p-2 rounded-md " />
        </div>
    );
};

export default SkeletonMessageBody;
