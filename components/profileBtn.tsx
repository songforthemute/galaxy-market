import Link from "next/link";

interface ProfileBtn {
    children: React.ReactNode;
    text: string;
    href: string;
}

const ProfileBtn = ({ text, children, href }: ProfileBtn) => {
    return (
        <Link href={href}>
            <a className="flex flex-col items-center cursor-pointer hover:opacity-50 transition-all">
                <div className="w-14 h-14 text-white bg-purple-400 rounded-full flex items-center justify-center">
                    {children}
                </div>
                <span className="mt-2 text-sm font-medium text-slate-700">
                    {text}
                </span>
            </a>
        </Link>
    );
};

export default ProfileBtn;
