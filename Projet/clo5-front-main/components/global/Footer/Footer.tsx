import { useTranslation } from "next-i18next";
import styles from "./Footer.module.scss";

type Props = { className?: string };

const Footer = ({ className }: Props) => {
  const { t } = useTranslation(["common"]);

  return (
    <footer className={`${styles["a{pp-footer"]} ${className || ""}`}>
      <h4 className="text--accent">Quantum Motors</h4>
    </footer>
  );
};

export default Footer;
