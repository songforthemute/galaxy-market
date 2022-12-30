import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
// types
import type { FC, ReactNode } from "react";
// utils
import { cls, useUser, useToggleSidebar } from "@libs/client";
// styles
import s from "./layout.module.css";
// components
import { ChevronLeft, HorizontalDots, Text } from "@components/Atoms";

const DockBar = dynamic(() => import("@components/Organisms/DockBar"));
const ConfigSidebar = dynamic(
    () => import("@components/Templates/ConfigSidebar")
);

interface Props {
    children: ReactNode;
    title: string;
    backwardButton?: boolean;
    dockBar?: boolean;
    configTab?: boolean;
}

const Layout: FC<Props> = ({
    title,
    children,
    backwardButton,
    dockBar,
    configTab,
}) => {
    const { pathname, back } = useRouter();
    const { user } = useUser();
    const { sidebar, toggleSidebar } = useToggleSidebar();

    return (
        <>
            <Head>
                <title>{`${title} | Galaxy Market`}</title>
            </Head>

            <>
                <header
                    className={cls(
                        !backwardButton ? "justify-center" : "justify-evenly",
                        s.header
                    )}
                >
                    {backwardButton && (
                        <button className={s.backButton} onClick={() => back()}>
                            <ChevronLeft />
                        </button>
                    )}

                    <Text
                        className="inline-block pointer-events-none text-achroma-dark font-medium"
                        variant="pageHeading"
                    >
                        {title}
                    </Text>

                    {configTab && (
                        <button
                            className={s.sidebar}
                            onClick={() => toggleSidebar()}
                        >
                            <HorizontalDots />
                        </button>
                    )}
                </header>

                {/* 뷰 */}
                <main className={cls("pt-[3.8125rem]", dockBar ? "pb-24" : "")}>
                    {/* 설정 OF & OFF */}
                    {sidebar && <ConfigSidebar userEmail={user?.email} />}

                    {children}
                </main>

                {dockBar && <DockBar pathname={pathname} userId={user?.id} />}
            </>
        </>
    );
};

export default Layout;
