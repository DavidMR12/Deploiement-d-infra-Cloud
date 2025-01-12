import styles from "./Icon.module.scss";

export const Icon = ({ src, width, height, className }: IconPropsTypes) => {
  const IconSVG = require(`../../../public/svg/${src}.svg`).default;

  return (
    <IconSVG
      className={`${styles["app-icon"]} ${className || ""}`}
      width={width}
      height={height}
    />
  );
};

export interface IconPropsTypes {
  src: string | object;
  width: number;
  height: number;
  className?: string;
}
