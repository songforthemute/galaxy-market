/**
 * @description This function support for easy using classnames in Tailwind.
 * @param {string[]} classNames
 * @returns {string}
 */
export const cls = (...classNames: string[]): string => {
    return classNames.join(" ");
};

/**
 * @description This function support for easy use of Boolean formula for using conditional classname in Tailwind , like _ternary operator_.
 * @param {boolean} formula Formula that returns `boolean` value.
 * @param {string} className1 classname if true.
 * @param {string | undefined} className2 classname if false. No essential parameter.
 * @returns {string}
 */
export const booleanCls = (
    formula: boolean,
    className1: string,
    className2 = ""
): string => {
    return Boolean(formula) ? className1 : className2;
};

/**
 * @description Return converted format of price.
 * @param {number | undefined} price
 * @returns
 */
export const convertPrice = (price?: number) => {
    if (price === undefined) return "";

    const willConvert = `${price}`;

    if (willConvert.length <= 3) return willConvert;

    let converted = "";
    const divider =
        willConvert.length % 3 === 2 ? 1 : willConvert.length % 3 === 0 ? 2 : 0;

    for (let i = willConvert.length - 1; i >= 0; i--) {
        if (i !== willConvert.length - 1 && i % 3 === divider) {
            converted = "," + converted;
        }

        converted = willConvert[i] + converted;
    }

    return converted;
};

/**
 * @description Return converted date from Date object.
 * @param {Date?} date Date Object to convert
 * @param {"Full" | "Time" | "Date"| undefined} opts option of `Date().toLocaleString()`
 * @returns {string}
 */
export const convertDate = (
    date?: Date,
    opts?: "Full" | "Time" | "Date"
): string => {
    if (!date) {
        return "Loading...";
    }

    return new Date(date).toLocaleString("ko-kr", {
        dateStyle: opts === "Time" ? undefined : "full",
        timeStyle: opts === "Date" ? undefined : "short",
    });
};
/**
 * @description Return Cloudflare Image Server URL.
 * @param {string | null | undefined} avatarUrl saved/temporary image URL
 * @param {string?} variants Resize options. Refer to Cloudflare Images Docs.
 * @returns {string}
 */
export const getImgSource = (
    avatarUrl?: string | null,
    variants?: string
): string => {
    return `https://imagedelivery.net/${
        process.env.NEXT_PUBLIC_CLOUDFLARE_HASH
    }/${avatarUrl}/${variants ? variants : "public"}`;
};

/**
 * @description Return path that more top than current path.
 * @param {string} pathname current path
 * @returns {string}
 */
export const goBackwardPath = (pathname: string): string => {
    const splited = pathname.split("/");
    splited.pop();
    return splited.join("/");
};
