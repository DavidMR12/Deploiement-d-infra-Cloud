import { FC, PropsWithChildren } from "react";
import { buttonStyles } from "types/UITypes";
import styles from "./Button.module.scss";

const Button: FC<PropsWithChildren<ButtonPropsTypes>> = ({
  style,
  children,
  className,
  isHovered,
  onClick,
  type,
  disabled,
}) => {
  return (
    <button
      className={`${styles["btn"]} ${style ? styles[style] : ""} ${
        className || ""
      }`}
      type={type}
      data-is-hovered={isHovered}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

interface ButtonPropsTypes {
  style?: buttonStyles;
  className?: string;
  isHovered?: boolean;
  onClick?: (...args: any) => void;
  type?: "submit" | "reset";
  disabled?: boolean;
  children: HTMLElement | string | React.ReactNode;
}
