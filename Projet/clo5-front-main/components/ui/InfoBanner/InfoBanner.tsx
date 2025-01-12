import { Icon } from "@/components/ui/Icon/Icon";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { mediaMD } from "lib/globalConstants";
import styles from "./InfoBanner.module.scss";

type Props = {
  title: string;
  className: string;
  hasIcon: boolean;
  children?: React.ReactNode;
};

const InfoBanner = ({ children, className, title, hasIcon }: Props) => {
  const MediaAboveMD = useMediaQuery(mediaMD);

  return (
    <div className={`${styles["info-banner"]} ${className || ""}`}>
      {hasIcon && MediaAboveMD ? (
        <Icon src="icon-infos" width={48} height={48} />
      ) : null}
      <div>
        <h3 className={`${styles["info-banner__title"]} h5`}>{title}</h3>
        {children}
      </div>
    </div>
  );
};

export default InfoBanner;
