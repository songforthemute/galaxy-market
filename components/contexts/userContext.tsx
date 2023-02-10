import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useReducer,
} from "react";
// types
import type { FC, ReactNode } from "react";

interface UserData {
    id: number;
    phone?: string | null;
    email: string;
    username: string;
    avatarUrl?: string | null;
}

interface UserState {
    isLoggedIn: boolean;
    userData: UserData | null;
}

const initialState: UserState = {
    isLoggedIn: false,
    userData: null,
};

type Action =
    | {
          type: "RENEW_USERDATA";
          userData: UserData;
      }
    | {
          type: "LOGGED_IN";
          userData: UserData;
      }
    | {
          type: "LOGGED_OUT";
      };

// useContext를 위한 context 객체
export const UserContext = createContext<UserState | any>(initialState);
UserContext.displayName = "UserContext";

const userReducer = (state: UserState, action: Action): UserState => {
    switch (action.type) {
        case "RENEW_USERDATA": {
            return { ...state, userData: action.userData };
        }
        case "LOGGED_IN": {
            return { isLoggedIn: true, userData: action.userData };
        }
        case "LOGGED_OUT": {
            return { isLoggedIn: false, userData: null };
        }
    }
};

export const UserProvider: FC<{ children?: ReactNode }> = (props) => {
    // useReducer: 리렌더링 시에도 변경되지 않음을 보장
    const [state, dispatch] = useReducer(userReducer, initialState);

    const renewUserData = useCallback(
        (userData: UserData) =>
            dispatch({ type: "RENEW_USERDATA", userData: userData }),
        [dispatch]
    );

    const loggedIn = useCallback(
        (userData: UserData) =>
            dispatch({ type: "LOGGED_IN", userData: userData }),
        [dispatch]
    );

    const loggedOut = useCallback(
        () => dispatch({ type: "LOGGED_OUT" }),
        [dispatch]
    );

    // useMemo will only recompute the memoized value when one of the deps has changed.
    const value = useMemo(
        () => ({
            ...state,
            renewUserData,
            loggedIn,
            loggedOut,
        }),
        [state, renewUserData, loggedIn, loggedOut]
    );

    /**
     * useContext를 호출한 컴포넌트는 context값이 변경되면 리렌더링되며,
     * useContext를 Context.Provider와 같이 사용하길 권장.
     * https://ko.reactjs.org/docs/hooks-reference.html#usecontext
     */
    return <UserContext.Provider value={value} {...props} />;
};

interface UserContextInterface extends UserState {
    renewUserData: (userData: UserData) => void;
    loggedIn: (userData: UserData) => void;
    loggedOut: () => void;
}

export const useUserContext = () => {
    const context = useContext<UserContextInterface>(UserContext);

    if (context === undefined) {
        //
        console.warn("this component needs to context.");
        throw new Error("this component needs to context.");
    }

    return context;
};

export const ManagedUserContext: React.FC<{ children?: React.ReactNode }> = ({
    children,
}) => {
    return <UserProvider>{children}</UserProvider>;
};
