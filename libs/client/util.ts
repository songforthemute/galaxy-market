export const cls = (...classNames: string[]) => {
    return classNames.join(" ");
};

export const priceConverter = (price?: string) => {
    if (!price) return "";
    if (price.length <= 3) return price;

    let converted = "";
    const divider = price.length % 3 === 2 ? 1 : price.length % 3 === 0 ? 2 : 0;

    for (let i = price.length - 1; i >= 0; i--) {
        if (i !== price.length - 1 && i % 3 === divider) {
            converted = "," + converted;
        }

        converted = price[i] + converted;
    }

    return converted;
};

export const fetcher = async (url: string) => {
    const response = await fetch(url);
    return await response.json();
};
