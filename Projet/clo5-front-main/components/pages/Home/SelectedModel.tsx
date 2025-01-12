import { ButtonWithLink } from "@/components/ui/Buttons";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { AnimatePresence, motion } from "framer-motion";
import { animEasingPrimary, mediaLG, mediaXL } from "lib/globalConstants";
import { checkType, numberWithSpaces } from "lib/helpers";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { Model } from "types/catalogTypes";
import styles from "./SelectedModel.module.scss";

type Props = {
  selectedModel: Model;
};

const SelectedModel = ({ selectedModel }: Props) => {
  const { t } = useTranslation(["common", "catalog"]);
  const MediaAboveLG = useMediaQuery(mediaLG);
  const MediaAboveXL = useMediaQuery(mediaXL);

  return (
    <div
      className={`${styles["selected-model"]}`}
      style={{ backgroundColor: "#59a600" }}
      data-vertical-layout={!MediaAboveLG}
    >
      <AnimatePresence mode="wait">
        <motion.figure
          key={selectedModel.image}
          className={`${styles["selected-model__image"]}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: MediaAboveLG ? 0.25 : 0.32,
            ease: animEasingPrimary,
          }}
        >
          <>
            <Image
              src={
                selectedModel.image
                  ? selectedModel.image
                  : "/images/default-car.jpeg"
              }
              alt={`${selectedModel.name} image`}
              width={980}
              height={654}
              priority
            />
          </>
        </motion.figure>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedModel.name}
          className={`${styles["selected-model__content"]}`}
          initial={
            MediaAboveLG ? { opacity: 0, x: -10 } : { opacity: 0, y: 20 }
          }
          animate={MediaAboveLG ? { opacity: 1, x: 0 } : { opacity: 1, y: 0 }}
          exit={MediaAboveLG ? { opacity: 0 } : { opacity: 0, y: -20 }}
          transition={{
            duration: 0.32,
            ease: animEasingPrimary,
          }}
        >
          <h1 className={`${styles["selected-model__title"]}`}>
            {selectedModel.name}
          </h1>
          <p className={`${styles["selected-model__price"]}`}>
            <>
              {t("common:starting-from")}{" "}
              {numberWithSpaces(selectedModel.price)}€ TTC
            </>
            <br />
            <>
              {"Type : "} {checkType(selectedModel.type)}
            </>
          </p>

          {selectedModel.description && MediaAboveXL ? (
            <div
              className={`${styles["selected-model__text"]}`}
              dangerouslySetInnerHTML={{
                __html: selectedModel.description,
              }}
            />
          ) : null}

          <ButtonWithLink
            className={`${styles["selected-model__button"]}`}
            href={{
              pathname: "/configure",
              query: { model_id: selectedModel.id },
            }}
          >
            {t("common:configure")}
          </ButtonWithLink>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SelectedModel;
