import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// utils
import { useMutation, useToggleSidebar, useUser } from "@libs/client";
// styles
import s from "./ConfigSidebar.module.css";
// components
import { Button, Sidebar } from "@components/Atoms";
import { LogOutModal, WithdrawalModal } from "@components/Organisms";

interface MutationReturn {
    status: boolean;
    error?: string;
}

const ConfigSidebar = () => {
    const { user } = useUser();
    const { reload, push } = useRouter();
    const { toggleSidebar } = useToggleSidebar();

    const [showLogOut, setShowLogOut] = useState(false);
    const [showWithdrawal, setShowWithdrawal] = useState(false);

    // logout user
    const [logOut, { loading: logOutLoading, data: logOutData }] =
        useMutation<MutationReturn>({
            url: `/api/users/me`,
            method: "POST",
        });

    useEffect(() => {
        if (logOutData && logOutData.status) {
            reload();
        }
    }, [logOutData, reload]);

    // withdrawal user
    const [withdrawal, { loading: withdrawalLoading, data: withdrawalData }] =
        useMutation<MutationReturn>({
            url: `/api/users/me`,
            method: "DELETE",
        });

    useEffect(() => {
        if (withdrawalData && withdrawalData.status) {
            reload();
        }
    }, [withdrawalData, reload]);

    return (
        <Sidebar className={s.root} onClose={() => toggleSidebar()}>
            {user ? (
                <>
                    <li className={s.listItem}>
                        <Button
                            variant="achromaOutline"
                            onClick={() => setShowLogOut(true)}
                            className={s.button}
                        >
                            로그아웃
                        </Button>

                        {showLogOut && (
                            <LogOutModal
                                loading={logOutLoading}
                                onClose={() => setShowLogOut(false)}
                                onConfirm={() => logOut({})}
                            />
                        )}
                    </li>
                    <li className={s.listItem}>
                        <Button
                            variant="achromaOutline"
                            onClick={() => setShowWithdrawal(true)}
                            className={s.button}
                        >
                            회원탈퇴
                        </Button>

                        {showWithdrawal && (
                            <WithdrawalModal
                                userEmail={user.email}
                                onClose={() => setShowWithdrawal(false)}
                                mutatorFn={withdrawal}
                                error={withdrawalData?.error}
                                loading={withdrawalLoading}
                            />
                        )}
                    </li>
                </>
            ) : (
                <li className={s.listItem}>
                    <Button
                        variant="achromaOutline"
                        onClick={() => {
                            toggleSidebar();
                            push("/auth");
                        }}
                        className={s.button}
                    >
                        로그인
                    </Button>
                </li>
            )}

            <li className={s.listItem}>
                <footer className={s.footer}>
                    &#169; {new Date().getFullYear()}. Galaxy-Market
                </footer>
                <footer className={s.footer}>
                    <a
                        href={`mailto:${process.env.NEXT_PUBLIC_CONTACT}`}
                        className={s.contact}
                    >
                        Contact to Dev &rarr;
                    </a>
                </footer>
            </li>
        </Sidebar>
    );
};

export default ConfigSidebar;
