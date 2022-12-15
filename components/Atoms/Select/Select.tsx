import * as Radix from "@radix-ui/react-select";
import { forwardRef } from "react";
// types
import type {
    FC,
    Dispatch,
    SetStateAction,
    ReactNode,
    RefAttributes,
} from "react";
// css
import s from "./Select.module.css";
// utill
import { cls } from "@libs/client/util";
// icons
import { ChevronDown, ChevronUp, Check } from "@components/Atoms";

interface ItemProps {
    children?: ReactNode | any;
    className?: string;
    value: string;
}

interface Props {
    required?: boolean;
    ariaLabel: string;
    placeholder: string;
    children?: ReactNode | any;
    className?: string;
    id?: string;
    setValue?: Dispatch<SetStateAction<string>> | any;
    defaultValue?: string;
    defaultChecked?: boolean;
}

export const SelectItem = forwardRef<
    HTMLDivElement,
    ItemProps & Radix.SelectItemProps & RefAttributes<HTMLDivElement>
>(({ children, value, className = "", ...rest }, forwardedRef) => {
    return (
        <Radix.Item
            className={cls(s.item, className)}
            value={value}
            ref={forwardedRef}
            {...rest}
        >
            <Radix.ItemText>{children || value}</Radix.ItemText>
            <Radix.ItemIndicator>
                <Check w={4} h={4} strokeWidth={2} />
            </Radix.ItemIndicator>
        </Radix.Item>
    );
});

export const Select: FC<Props> = ({
    className = "",
    ariaLabel,
    setValue,
    required,
    placeholder,
    defaultValue,
    defaultChecked,
    children,
    id,
    ...rest
}) => {
    const _onValueChange = (value: string) => setValue(value);

    return (
        <Radix.Root required={required} onValueChange={_onValueChange}>
            <Radix.Trigger
                defaultValue={defaultValue}
                defaultChecked={defaultChecked}
                className={cls(s.trigger, className)}
                aria-label={ariaLabel}
                id={id}
                {...rest}
            >
                <Radix.SelectValue
                    className={s.value}
                    placeholder={placeholder}
                />
                <Radix.Icon className={s.icon}>
                    <ChevronDown />
                </Radix.Icon>
            </Radix.Trigger>

            <Radix.Portal>
                <Radix.Content className={s.content}>
                    <Radix.ScrollUpButton className={s.icon}>
                        <ChevronUp />
                    </Radix.ScrollUpButton>

                    <Radix.Viewport className={s.viewport}>
                        <Radix.Group>{children}</Radix.Group>
                    </Radix.Viewport>

                    <Radix.ScrollDownButton className={s.icon}>
                        <ChevronDown />
                    </Radix.ScrollDownButton>
                </Radix.Content>
            </Radix.Portal>
        </Radix.Root>
    );
};
