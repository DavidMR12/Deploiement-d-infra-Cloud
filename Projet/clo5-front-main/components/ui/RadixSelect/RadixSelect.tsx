import { Icon } from "@/components/ui/Icon/Icon";
import * as Select from "@radix-ui/react-select";
import { forwardRef } from "react";

type Props = {
  children: React.ReactNode;
  [value: string]: any;
  value: string;
};

export type Ref = HTMLButtonElement;

export const SelectRadix = forwardRef<Ref, Props>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <Select.Root {...props}>
        <Select.Trigger
          ref={forwardedRef}
          className={`form-select__trigger ${
            props.value === "" && "form-select__trigger--placeholder"
          }`}
        >
          <Select.Value />
          <Select.Icon className={`form-select__trigger__icon`}>
            <Icon src="icon-chevron" width={24} height={24} />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className={`form-select__content`}>
            <Select.Viewport>{children}</Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    );
  }
);
SelectRadix.displayName = "SelectRadix";

export type ItemRef = HTMLDivElement;

export const SelectItemRadix = forwardRef<ItemRef, Props>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <Select.Item
        {...props}
        className={`form-select__item`}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
      </Select.Item>
    );
  }
);
SelectItemRadix.displayName = "SelectItemRadix";
