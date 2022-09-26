export const cls = (...classNames: string[]) => {
    return classNames.join(" ");
};

export const priceConverter = (p: string) => {
    const converted: string[] = [];

    for (let i = p.length - 1; i >= 0; i--) {
        if (i % 3 === 2 && i !== p.length - 1) {
            converted.push(",");
        }

        converted.push(p[i]);
    }

    return converted.reverse().join("");
};
