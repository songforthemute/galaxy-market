interface CommentProps {
    key: number;
    text: string;
    creator: string;
    createdAt: string;
    imgUrl?: string; // 추후 추가
}

const Reply = ({ key, text, creator, createdAt, imgUrl }: CommentProps) => {
    return (
        <div key={key} className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-neutral-200 rounded-full" />
            <div>
                <div className="text-sm font-medium text-gray-700">
                    {creator}
                </div>
                <div className="text-xs text-gray-400">{createdAt}</div>
                <p className="text-gray-700 mt-2">{text}</p>
            </div>
        </div>
    );
};

export default Reply;
