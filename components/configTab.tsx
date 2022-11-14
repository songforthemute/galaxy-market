import { useRouter } from "next/router";
import { useState } from "react";

const ConfigTab = () => {
    const router = useRouter();
    const [showingLogOut, setShowingLogOut] = useState(false);
    const _onClickShowingLogOut = () => {
        setShowingLogOut((prev) => !prev);
    };
    const _onClickLogOut = async () => {
        await fetch(`/api/users/me/logout`, {
            method: "POST",
        }).then(() => router.reload());
    };

    const [showingQuestion, setShowingQuestion] = useState(false);
    const _onClickShowingQuestion = () => {
        setShowingQuestion((prev) => !prev);
    };

    const [showingWithdrawal, setShowingWithdrawal] = useState(false);
    const _onClickShowingWithdrawal = () => {
        setShowingWithdrawal((prev) => !prev);
    };
    const _onClickWithdrawal = async () => {
        const ok = window.confirm("정말 탈퇴하시겠습니까?");

        if (ok) {
            window.alert("이용해주셔서 감사합니다.");

            await fetch(`/api/users/me/withdrawal`, {
                method: "POST",
            }).then(() => router.reload());
        }
    };

    return (
        <div className="p-2 w-full h-full bg-white">
            <ul className="w-full flex flex-col items-center justify-centers divide-y-[1px] transition-all">
                <li
                    onClick={_onClickShowingLogOut}
                    className="w-full cursor-pointer py-4 text-center text-lg font-semibold hover:text-purple-400 transition-all"
                >
                    로그아웃
                </li>
                {showingLogOut && (
                    <div className="py-4 space-y-4">
                        <h5 className="font-medium">
                            정말 로그아웃 하실건가요?
                        </h5>
                        <div className="flex justify-center items-center space-x-4">
                            <button
                                onClick={_onClickLogOut}
                                className="text-sm font-semibold text-blue-400 hover:text-purple-400 hover:opacity-50 transition-all rounded-2xl w-16 h-10 bg-slate-200"
                            >
                                네
                            </button>
                            <button
                                onClick={_onClickShowingLogOut}
                                className="text-sm font-semibold hover:text-purple-400 hover:opacity-50 transition-all rounded-2xl w-16 h-10 bg-slate-200"
                            >
                                아니요
                            </button>
                        </div>
                    </div>
                )}

                <li
                    onClick={_onClickShowingQuestion}
                    className="w-full cursor-pointer py-4 text-center text-lg font-semibold hover:text-purple-400 transition-all"
                >
                    문의사항
                </li>
                {showingQuestion && (
                    <div className="py-8 text-center">
                        문의사항이 있으시다면 아래의 이메일로 문의주세요.
                        <br />
                    </div>
                )}

                <li
                    onClick={_onClickShowingWithdrawal}
                    className="w-full cursor-pointer py-4 text-center text-lg font-semibold hover:text-purple-400 transition-all"
                >
                    회원탈퇴
                </li>
                {showingWithdrawal && (
                    <div className="py-4 space-y-4">
                        <h5 className="font-medium text-center">
                            정말 탈퇴하시겠습니까?
                            <br />
                            탈퇴한 후 데이터는 복구할 수 없습니다.
                        </h5>
                        <div className="flex justify-center items-center space-x-4">
                            <button
                                onClick={_onClickWithdrawal}
                                className="text-sm font-semibold text-red-400 hover:text-purple-400 hover:opacity-50 transition-all rounded-2xl w-16 h-10 bg-slate-200"
                            >
                                네
                            </button>
                            <button
                                onClick={_onClickShowingWithdrawal}
                                className="text-sm font-semibold hover:text-purple-400 hover:opacity-50 transition-all rounded-2xl w-16 h-10 bg-slate-200"
                            >
                                아니요
                            </button>
                        </div>
                    </div>
                )}

                <footer className="text-center py-4 w-full">
                    &copy; Galaxy Market {new Date().getFullYear()} All rights
                    reserved.
                </footer>
            </ul>
        </div>
    );
};

export default ConfigTab;
