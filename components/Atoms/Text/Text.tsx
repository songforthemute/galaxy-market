// types
import type {
    ReactNode,
    FC,
    ComponentType,
    JSXElementConstructor,
    ReactElement,
} from "react";
// utils
import { booleanCls, cls } from "@libs/client/util";
//css
import s from "./Text.module.css";

interface Props {
    variant?: Variant;
    className?: string;
    children?: ReactNode | any;
    onClick?: () => any | void;
}

type Variant =
    | "pageHeading"
    | "contentsHeading"
    | "body"
    | "span"
    | "paragraph";
type htmlType = "h1" | "h3" | "div" | "span" | "p" | string;

const Text: FC<Props> = ({
    variant = "body",
    className = "",
    children,
    onClick,
    ...rest
}) => {
    const componentsMap: {
        [v in Variant]: ComponentType<htmlType> | htmlType;
    } = {
        pageHeading: "h1",
        contentsHeading: "h3",
        body: "div",
        span: "span",
        paragraph: "p",
    };

    const Component:
        | JSXElementConstructor<any>
        | ReactElement<any>
        | ComponentType<any>
        | htmlType = componentsMap![variant!];

    return (
        <Component
            className={cls(className, booleanCls(true, s[variant]))}
            onClick={onClick}
            {...rest}
        >
            {children}
        </Component>
    );
};

export default Text;
