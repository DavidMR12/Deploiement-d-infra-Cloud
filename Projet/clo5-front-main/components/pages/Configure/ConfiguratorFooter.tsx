import { useHasHydrated } from "@/hooks/useHasHydrated";
import { motion } from "framer-motion";
import { animEasingPrimary, mediaLG } from "lib/globalConstants";
import { numberWithSpaces } from "lib/helpers";
import { useTranslation } from "next-i18next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { InitialModel } from "types/catalogTypes";
import styles from "./ConfiguratorFooter.module.scss";

type Props = {
  configuratorValues: any;
  initialModel: InitialModel;
  isLoading: boolean;
};

const ConfiguratorFooter = ({
  configuratorValues,
  initialModel,
  isLoading,
}: Props) => {
  const { t } = useTranslation(["common", "catalog"]);
  const hasHydrated = useHasHydrated();
  const carPrice = `${numberWithSpaces(configuratorValues?.price)} € TTC`;

  return (
    <>
      {hasHydrated && (
        <motion.aside
          className={`${styles["configurator-footer"]}`}
          style={{ backgroundColor: initialModel?.brandColor }}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.5,
            ease: animEasingPrimary,
          }}
        >
          <div className={`${styles["configurator-footer__top"]}`}>
            <div className={`${styles["configurator-footer__text"]}`}>
              <>
                <>
                  {"Quantum"}&nbsp;
                  {initialModel.modelName}&nbsp;
                  {t("catalog:for")}&nbsp;
                  {isLoading ? (
                    <span className={`inline-block`}>
                      <Skeleton className={`skeleton__line`} />
                    </span>
                  ) : (
                    <>{carPrice}</>
                  )}
                </>
              </>
            </div>
          </div>
        </motion.aside>
      )}
    </>
  );
};

export default ConfiguratorFooter;
