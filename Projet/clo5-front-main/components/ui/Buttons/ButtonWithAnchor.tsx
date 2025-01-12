import { FC, PropsWithChildren } from "react";
import { buttonStyles } from "types/UITypes";
import styles from "./Button.module.scss";

const Button: FC<PropsWithChildren<ButtonPropsTypes>> = ({
  anchor,
  target,
  style,
  rel,
  children,
  className,
}) => {
  return (
    <a
      className={`${styles["btn"]} ${style ? styles[style] : ""} ${
        className || ""
      }`}
      target={target}
      rel={rel}
      href={anchor}
    >
      {children}
    </a>
  );
};

export default Button;
interface ButtonPropsTypes {
  anchor: string;
  target?: string;
  style?: buttonStyles;
  rel?: string;
  className?: string;
  children: HTMLElement;
}
