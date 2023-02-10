interface UserData {
    id: number;
    username: string;
    email: string;
    avatarUrl?: string | null;
    phone?: string | null;
}

/**
 * @description Save user data to sessionStorage in Browser.
 * @param {UserData} userData id, username, email, avatarUrl, phone
 * @returns {void}
 */
export const loggedInSession = ({
    id,
    username,
    email,
    phone,
    avatarUrl,
}: UserData): void => {
    if (typeof window !== "undefined") {
        window.sessionStorage.setItem("id", `${id}`);
        window.sessionStorage.setItem("username", `${username}`);
        window.sessionStorage.setItem("email", `${email}`);
        if (avatarUrl)
            window.sessionStorage.setItem("avatarUrl", `${avatarUrl}`);
        if (phone) window.sessionStorage.setItem("phone", `phone`);
    }
};

/**
 * @description Destroy user data to sessionStorage in Browser.
 * @returns {void}
 */
export const loggedOutSession = (): void => {
    if (typeof window !== "undefined") {
        window.sessionStorage.clear();
    }
};

interface RenewableUserData {
    username?: string;
    avatarUrl?: string | null;
    phone?: string | null;
}

/**
 * @description Renew user data to sessionStorage in Browser.
 * @param {RenewableUserData} userData username, avatarUrl, phone
 */
export const renewSession = ({
    username,
    avatarUrl,
    phone,
}: RenewableUserData): void => {
    if (typeof window !== "undefined") {
        if (username) window.sessionStorage.setItem("username", `${username}`);
        if (avatarUrl)
            window.sessionStorage.setItem("avatarUrl", `${avatarUrl}`);
        if (phone) window.sessionStorage.setItem("phone", `phone`);
    }
};

type SessionKey = "id" | "username" | "avatarUrl" | "phone" | "email";

/**
 * @description Get data from session storage if has data
 * @param {SessionKey} key key of session storage
 * @returns {string | null} Return stored data if stored
 */
export const getSessionValue = (key: SessionKey): string | null => {
    let value = null;

    if (typeof window !== "undefined") {
        value = window.sessionStorage.getItem(key);
    }

    return value;
};

/**
 * @description Return boolean value whether session storage stored something.
 * @returns {boolean}
 */
export const isEmptySession = (): boolean => {
    if (typeof window !== "undefined") {
        return !Boolean(window.sessionStorage.length);
    }

    return true;
};
