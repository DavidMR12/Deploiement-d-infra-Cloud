import styles from "./ErrorBanner.module.scss";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const ErrorBanner = ({ children, className }: Props) => {
  return (
    <div className={`${styles["error-banner"]} ${className || ""}`}>
      {children}
    </div>
  );
};

export default ErrorBanner;
