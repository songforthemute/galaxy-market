import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useReducer,
} from "react";
// import { ThemeProvider } from "./themeContext";
// types
import type { FC, ReactNode } from "react";

export interface UIState {
    showSidebar: boolean;
    showDropdown: boolean;
    showModal: boolean;
    modalView: string;
}

const initialState: UIState = {
    showSidebar: false,
    showDropdown: false,
    showModal: false,
    modalView: "",
};

type Action =
    | {
          type: "OPEN_SIDEBAR";
      }
    | {
          type: "CLOSE_SIDEBAR";
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
      };

// NEED TO FEAT THIS
type MODAL_VIEWS = "LOGIN_VIEW" | "SIGN_VIEW" | "RECONFIGURE_VIEW";

// useContext를 위한 context 객체
export const UIContext = createContext<UIState | any>(initialState);
UIContext.displayName = "UIContext";

const uiReducer = (state: UIState, action: Action): UIState => {
    switch (action.type) {
        case "OPEN_SIDEBAR": {
            return { ...state, showSidebar: true };
        }
        case "CLOSE_SIDEBAR": {
            return { ...state, showSidebar: false };
        }
        case "OPEN_DROPDOWN": {
            return { ...state, showDropdown: true };
        }
        case "CLOSE_DROPDOWN": {
            return { ...state, showDropdown: false };
        }
        case "OPEN_MODAL": {
            return { ...state, showModal: true, showSidebar: false };
        }
        case "CLOSE_MODAL": {
            return { ...state, showModal: false };
        }
        case "SET_MODAL_VIEW": {
            return { ...state, modalView: action.view };
        }
    }
};

export const UIProvider: FC<{ children?: ReactNode }> = (props) => {
    // useReducer: 리렌더링 시에도 변경되지 않음을 보장
    const [state, dispatch] = useReducer(uiReducer, initialState);

    const openSidebar = useCallback(
        () => dispatch({ type: "OPEN_SIDEBAR" }),
        [dispatch]
    );

    const closeSidebar = useCallback(
        () => dispatch({ type: "CLOSE_SIDEBAR" }),
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

    const setModalView = useCallback(
        (view: MODAL_VIEWS) => dispatch({ type: "SET_MODAL_VIEW", view }),
        [dispatch]
    );

    // useMemo will only recompute the memoized value when one of the deps has changed.
    const value = useMemo(
        () => ({
            ...state,
            openSidebar,
            closeSidebar,
            openDropdown,
            closeDropdown,
            openModal,
            closeModal,
            setModalView,
        }),
        [
            state,
            openSidebar,
            closeSidebar,
            openDropdown,
            closeDropdown,
            openModal,
            closeModal,
            setModalView,
        ]
    );

    /**
     * useContext를 호출한 컴포넌트는 context값이 변경되면 리렌더링되며,
     * useContext를 Context.Provider와 같이 사용하길 권장.
     * https://ko.reactjs.org/docs/hooks-reference.html#usecontext
     */
    return <UIContext.Provider value={value} {...props} />;
};

interface useUIInterface extends UIState {
    openSidebar: () => void;
    closeSidebar: () => void;
    openDropdown: () => void;
    closeDropdown: () => void;
    openModal: () => void;
    closeModal: () => void;
    setModalView: (view: MODAL_VIEWS) => void;
}

export const useUI = () => {
    const context = useContext<useUIInterface>(UIContext);

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
            {/* <ThemeProvider> */}
            {children}
            {/* </ThemeProvider> */}
        </UIProvider>
    );
};
