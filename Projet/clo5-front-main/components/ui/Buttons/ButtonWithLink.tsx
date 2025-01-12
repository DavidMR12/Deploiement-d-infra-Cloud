import Link from "next/link";
import { FC, PropsWithChildren } from "react";
import { buttonStyles } from "types/UITypes";
import styles from "./Button.module.scss";

const Button: FC<PropsWithChildren<ButtonPropsTypes>> = ({
  href,
  target,
  style,
  rel,
  shallow,
  children,
  className,
}) => {
  return (
    <Link
      href={href}
      target={target}
      className={`${styles["btn"]} ${style ? styles[style] : ""} ${
        className || ""
      }`}
      rel={rel}
    >
      {children}
    </Link>
  );
};

export default Button;

interface ButtonPropsTypes {
  href: string | object;
  target?: string;
  style?: buttonStyles;
  rel?: string;
  className?: string;
  shallow?: boolean;
  children: HTMLElement | string | React.ReactNode;
}
