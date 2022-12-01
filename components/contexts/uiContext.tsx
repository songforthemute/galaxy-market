import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useReducer,
} from "react";
import { ThemeProvider } from "./themeContext";
// types
import type { FC, ReactNode } from "react";

export interface UIState {
    showSidetab: boolean;
    showDropdown: boolean;
    showModal: boolean;
    modalView: string;
    userAvatar: string | null;
}

const initialState: UIState = {
    showSidetab: false,
    showDropdown: false,
    showModal: false,
    modalView: "",
    userAvatar: null,
};

type Action =
    | {
          type: "OPEN_SIDETAB";
      }
    | {
          type: "CLOSE_SIDETAB";
      }
    | {
          type: "OPEN_DROPDOWN";
      }
    | {
          type: "CLOSE_DROPDOWN";
      }
    | {
          type: "OPEN_MODAL";
      }
    | {
          type: "CLOSE_MODAL";
      }
    | {
          type: "SET_MODAL_VIEW";
          view: MODAL_VIEWS;
      }
    | {
          type: "SET_USER_AVATAR";
          url: string;
      };

// NEED TO FEAT THIS
type MODAL_VIEWS = "LOGIN_VIEW" | "SIGN_VIEW" | "RECONFIGURE_VIEW";

// useContext를 위한 context 객체
export const UIContext = createContext<UIState | any>(initialState);
UIContext.displayName = "UIContext";

const uiReducer = (state: UIState, action: Action): UIState => {
    switch (action.type) {
        case "OPEN_SIDETAB": {
            return { ...state, showSidetab: true };
        }
        case "CLOSE_SIDETAB": {
            return { ...state, showSidetab: false };
        }
        case "OPEN_DROPDOWN": {
            return { ...state, showDropdown: true };
        }
        case "CLOSE_DROPDOWN": {
            return { ...state, showDropdown: false };
        }
        case "OPEN_MODAL": {
            return { ...state, showModal: true, showSidetab: false };
        }
        case "CLOSE_MODAL": {
            return { ...state, showModal: false };
        }
        case "SET_MODAL_VIEW": {
            return { ...state, modalView: action.view };
        }
        case "SET_USER_AVATAR": {
            return { ...state, userAvatar: action.url };
        }
    }
};

export const UIProvider: FC<{ children?: ReactNode }> = (props) => {
    // useReducer: 리렌더링 시에도 변경되지 않음을 보장
    const [state, dispatch] = useReducer(uiReducer, initialState);

    const openSidetab = useCallback(
        () => dispatch({ type: "OPEN_SIDETAB" }),
        [dispatch]
    );

    const closeSidetab = useCallback(
        () => dispatch({ type: "CLOSE_SIDETAB" }),
        [dispatch]
    );

    const openDropdown = useCallback(
        () => dispatch({ type: "OPEN_DROPDOWN" }),
        [dispatch]
    );

    const closeDropdown = useCallback(
        () => dispatch({ type: "CLOSE_DROPDOWN" }),
        [dispatch]
    );

    const openModal = useCallback(
        () => dispatch({ type: "OPEN_MODAL" }),
        [dispatch]
    );

    const closeModal = useCallback(
        () => dispatch({ type: "CLOSE_MODAL" }),
        [dispatch]
    );

    const setUserAvatar = useCallback(
        (url: string) => dispatch({ type: "SET_USER_AVATAR", url }),
        [dispatch]
    );

    const setModalView = useCallback(
        (view: MODAL_VIEWS) => dispatch({ type: "SET_MODAL_VIEW", view }),
        [dispatch]
    );

    // useMemo will only recompute the memoized value when one of the deps has changed.
    const value = useMemo(
        () => ({
            ...state,
            openSidetab,
            closeSidetab,
            openDropdown,
            closeDropdown,
            openModal,
            closeModal,
            setUserAvatar,
            setModalView,
        }),
        [state]
    );

    /**
     * useContext를 호출한 컴포넌트는 context값이 변경되면 리렌더링되며,
     * useContext를 Context.Provider와 같이 사용하길 권장.
     * https://ko.reactjs.org/docs/hooks-reference.html#usecontext
     */
    return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
    const context = useContext(UIContext);

    if (context === undefined) {
        //
        console.warn("this component needs to context.");
        throw new Error("this component needs to context.");
    }

    return context;
};

export const ManagedUIContext: React.FC<{ children?: React.ReactNode }> = ({
    children,
}) => {
    return (
        <UIProvider>
            <ThemeProvider>{children}</ThemeProvider>
        </UIProvider>
    );
};
