import { useRouter } from "next/router";
import { cls } from "@libs/client/util";
import { useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const DockBtn = dynamic(() => import("./dockBtn"), {
    ssr: true,
});
const ConfigTab = dynamic(() => import("./configTab"), {
    ssr: true,
});

interface LayoutProps {
    children: React.ReactNode;
    title: string;
    canGoBack?: boolean;
    hasTabBar?: boolean;
    hasConfig?: boolean;
}

const Layout = ({
    title,
    canGoBack,
    hasTabBar,
    children,
    hasConfig,
}: LayoutProps) => {
    const router = useRouter();
    const { pathname } = router;
    const _onClickBack = () => {
        router.back();
    };

    const [showingConfig, setShowingConfig] = useState(false);
    const _onClickConfig = () => {
        setShowingConfig((prev) => !prev);
    };

    return (
        <div className="">
            <Head>
                <title>{`${title} | Galaxy Market`}</title>
            </Head>

            <div
                className={cls(
                    !canGoBack ? "justify-center" : "justify-evenly",
                    "bg-white w-full text-lg font-medium py-4 fixed text-slate-700 border-b top-0 flex items-center z-50"
                )}
            >
                {canGoBack && (
                    <button
                        className="absolute left-6 p-1 text-slate-700 text-2xl font-light focus:text-purple-400 hover:text-purple-400 transition-all"
                        onClick={_onClickBack}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                )}
                {title && (
                    <span className="block pointer-events-none">{title}</span>
                )}
                {hasConfig && (
                    <button
                        className="absolute right-6 p-1 text-slate-700 text-2xl font-light hover:text-purple-400 transition-all"
                        onClick={_onClickConfig}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                            />
                        </svg>
                    </button>
                )}
            </div>

            {/* 뷰 */}
            <div className={cls("pt-16", hasTabBar ? "pb-24" : "")}>
                {/* 설정 OF & OFF */}
                {showingConfig && (
                    <div className="fixed transition-all border-none top-14 w-full h-full z-10">
                        <ConfigTab />
                    </div>
                )}

                {children}
            </div>

            {hasTabBar && (
                <nav className="bg-white w-full text-slate-700 border-t fixed bottom-0 py-4 flex justify-evenly items-center">
                    <DockBtn
                        text="홈"
                        href="/"
                        isActive={
                            pathname === "/"
                            // || pathname === "/items/[id]" || pathname === "/items/upload"
                        }
                    >
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                    </DockBtn>

                    <DockBtn
                        text="검색"
                        href="/search"
                        isActive={pathname.slice(0, 7) === "/search"}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </DockBtn>

                    <DockBtn
                        text="커뮤니티"
                        href="/community"
                        isActive={pathname.slice(0, 10) === "/community"}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                                clipRule="evenodd"
                            />
                            <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                        </svg>
                    </DockBtn>

                    <DockBtn
                        text="메시지"
                        href="/chats"
                        isActive={pathname.slice(0, 6) === "/chats"}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </DockBtn>

                    <DockBtn
                        text="프로필"
                        href="/profile"
                        isActive={pathname.slice(0, 8) === "/profile"}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </DockBtn>
                </nav>
            )}
        </div>
    );
};

export default Layout;
