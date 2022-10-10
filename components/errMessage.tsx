interface ErrorMessageProps {
    text: string;
}

const ErrorMessage = ({ text }: ErrorMessageProps) => {
    return (
        <span className="relative -top-2.5 text-xs font-medium text-orange-400 transition-all">
            {text}
        </span>
    );
};

export default ErrorMessage;
