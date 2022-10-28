interface ErrorMessageProps {
    text?: string;
}

const ErrorMessage = ({ text }: ErrorMessageProps) => {
    return (
        <span className="relative -top-0.5 left-1 text-xs font-medium text-orange-400 transition-all">
            {text}
        </span>
    );
};

export default ErrorMessage;
