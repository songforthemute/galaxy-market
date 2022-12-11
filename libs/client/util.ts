export const cls = (...classNames: string[]) => {
    return classNames.join(" ");
};

export const booleanCls = (
    formula: boolean,
    className1: string,
    className2 = ""
) => {
    return Boolean(formula) ? className1 : className2;
};

export const convertPrice = (price?: number) => {
    if (!price) return "";

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

export const convertDate = (date: Date, opts?: "Full" | "Time" | "Date") => {
    return new Date(date).toLocaleString("ko-kr", {
        dateStyle: opts === "Time" ? undefined : "full",
        timeStyle: opts === "Date" ? undefined : "short",
    });
};

export const fetcher = async (url: string, opts?: any) => {
    const response = await fetch(url, opts);
    return await response.json();
};

export const getImgSource = (avatarUrl?: string | null, variants?: string) => {
    return `https://imagedelivery.net/${
        process.env.NEXT_PUBLIC_CLOUDFLARE_HASH
    }/${avatarUrl}/${variants ? variants : "public"}`;
};
