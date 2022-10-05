import { useRouter } from "next/router";
import { cls } from "@libs/client/util";
import DockBtn from "./dockBtn";

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
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
    const _onClickConfig = () => {};

    return (
        <div className="">
            <div
                className={cls(
                    !canGoBack ? "justify-center" : "justify-evenly",
                    "bg-white w-full text-lg font-medium py-4 fixed text-gray-700 border-b top-0 flex items-center"
                )}
            >
                {canGoBack && (
                    <button
                        className="absolute left-6 p-1 text-gray-700 text-2xl font-light focus:text-purple-400 hover:text-purple-400 transition-all"
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
                        className="absolute right-6 p-1 text-gray-700 text-2xl font-light focus:text-purple-400 hover:text-purple-400 transition-all"
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
            <div className={cls("pt-16", hasTabBar ? "pb-24" : "")}>
                {children}
            </div>
            {hasTabBar && (
                <nav className="bg-white w-full text-gray-700 border-t fixed bottom-0 py-4 flex justify-evenly items-center">
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
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                    </DockBtn>

                    <DockBtn
                        text="동네"
                        href="/community"
                        isActive={pathname.slice(0, 10) === "/community"}
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
                                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                            />
                        </svg>
                    </DockBtn>

                    <DockBtn
                        text="메시지"
                        href="/chats"
                        isActive={pathname.slice(0, 6) === "/chats"}
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
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
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
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                    </DockBtn>

                    <DockBtn
                        text="라이브"
                        href="/lives"
                        isActive={pathname.slice(0, 6) === "/lives"}
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
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </DockBtn>
                </nav>
            )}
        </div>
    );
};

export default Layout;
