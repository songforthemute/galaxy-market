// utils
import useFocusEvent from "@libs/client/useFocusEvent";
import { booleanCls, cls } from "@libs/client";
// styles
import s from "./DockBar.module.css";
// components
import {
    Anchor,
    Building,
    ChatBubbleSquare,
    Home,
    MagnifyingGlass,
    Text,
    User,
} from "@components/Atoms";

interface Props {
    pathname?: string;
    userId?: number;
}

const DockBar = ({ pathname, userId }: Props) => {
    const { onKeyDownEnter } = useFocusEvent("itself");

    return (
        <nav className={s.dock}>
            <li>
                <Anchor
                    href={"/"}
                    onKeyDown={onKeyDownEnter}
                    tabIndex={0}
                    className={cls(
                        s.dockButton,
                        booleanCls(pathname === "/", s.active)
                    )}
                >
                    <Home />
                    <Text variant="span">홈</Text>
                </Anchor>
            </li>

            <li>
                <Anchor
                    href={"/search"}
                    onKeyDown={onKeyDownEnter}
                    tabIndex={0}
                    className={cls(
                        s.dockButton,
                        booleanCls(
                            pathname?.slice(0, 7) === "/search",
                            s.active
                        )
                    )}
                >
                    <MagnifyingGlass />
                    <Text variant="span">검색하기</Text>
                </Anchor>
            </li>

            <li>
                <Anchor
                    href={"/community"}
                    onKeyDown={onKeyDownEnter}
                    tabIndex={0}
                    className={cls(
                        s.dockButton,
                        booleanCls(
                            pathname?.slice(0, 10) === "/community",
                            s.active
                        )
                    )}
                >
                    <Building />
                    <Text variant="span">커뮤니티</Text>
                </Anchor>
            </li>

            <li>
                <Anchor
                    href={"/chats"}
                    onKeyDown={onKeyDownEnter}
                    tabIndex={0}
                    className={cls(
                        s.dockButton,
                        booleanCls(pathname?.slice(0, 6) === "/chats", s.active)
                    )}
                >
                    <ChatBubbleSquare />
                    <Text variant="span">메시지</Text>
                </Anchor>
            </li>

            <li>
                <Anchor
                    href={`/profile/${userId}`}
                    onKeyDown={onKeyDownEnter}
                    tabIndex={0}
                    className={cls(
                        s.dockButton,
                        booleanCls(
                            pathname?.slice(0, 8) === "/profile",
                            s.active
                        )
                    )}
                >
                    <User />
                    <Text variant="span">프로필</Text>
                </Anchor>
            </li>
        </nav>
    );
};

export default DockBar;
