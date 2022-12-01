import { createContext, useCallback, useMemo, useReducer } from "react";
// types
import type { FC, ReactNode } from "react";

export interface ThemeState {
    darkMode: boolean;
}

const initialState: ThemeState = {
    darkMode: false,
};

type Action =
    | {
          type: "ON_DARKMODE";
      }
    | {
          type: "OFF_DARKMODE";
      };

// useContext를 위한 context 객체
export const ThemeContext = createContext<ThemeState | any>(initialState);
ThemeContext.displayName = "UIContext";

const themeReducer = (state: ThemeState, action: Action): ThemeState => {
    switch (action.type) {
        case "ON_DARKMODE": {
            return { ...state, darkMode: true };
        }
        case "OFF_DARKMODE": {
            return { ...state, darkMode: false };
        }
    }
};

export const ThemeProvider: FC<{ children?: ReactNode }> = (children) => {
    // useReducer: 리렌더링 시에도 변경되지 않음을 보장
    const [state, dispatch] = useReducer(themeReducer, initialState);

    const onDarkMode = useCallback(
        () => dispatch({ type: "ON_DARKMODE" }),
        [dispatch]
    );

    const offDarkMode = useCallback(
        () => dispatch({ type: "OFF_DARKMODE" }),
        [dispatch]
    );

    // useMemo will only recompute the memoized value when one of the deps has changed.
    const value = useMemo(
        () => ({
            ...state,
            onDarkMode,
            offDarkMode,
        }),
        [state]
    );

    /**
     * useContext를 호출한 컴포넌트는 context값이 변경되면 리렌더링되며,
     * useContext를 Context.Provider와 같이 사용하길 권장.
     * https://ko.reactjs.org/docs/hooks-reference.html#usecontext
     */
    return <ThemeContext.Provider value={value} {...children} />;
};
