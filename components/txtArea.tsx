interface TxtAreaProps {
    placeholder?: string;
    name: string;
    label?: string;
    rows?: number;
    [key: string]: any;
}

const TxtArea = ({
    placeholder,
    name,
    label,
    rows = 4,
    ...properties
}: TxtAreaProps) => {
    return (
        <div className="my-4">
            <label
                className="text-sm font-medium text-gray-400 block mb-1"
                htmlFor={name}
            >
                {label}
            </label>
            <textarea
                rows={rows}
                id={name}
                name={name}
                placeholder={placeholder}
                {...properties}
                className="mt-1 shadow-md w-full rounded-md border border-transparent
                focus:ring-purple-400 focus:border-purple-400 placeholder:text-gray-400"
            />
        </div>
    );
};

export default TxtArea;
