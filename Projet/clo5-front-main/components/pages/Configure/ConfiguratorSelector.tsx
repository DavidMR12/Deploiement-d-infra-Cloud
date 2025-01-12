import { ButtonWithoutLink } from "@/components/ui/Buttons";
import { Icon } from "@/components/ui/Icon/Icon";
import { useHasHydrated } from "@/hooks/useHasHydrated";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { motion, Variants } from "framer-motion";
import { animEasingPrimary } from "lib/globalConstants";
import { formatChoicePrice, numberWithSpaces } from "lib/helpers";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { InitialModel } from "types/catalogTypes";
import styles from "./ConfiguratorSelector.module.scss";

type Props = {
  configuratorValues: any;
  isLoading: boolean;

  form: UseFormReturn;
  initialModel: InitialModel;
  scrollRef: any;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
  setActiveTab: Dispatch<SetStateAction<string>>;
  setActiveSlideIndex: Dispatch<SetStateAction<number>>;
};

const ConfiguratorSelector = ({
  configuratorValues,
  isLoading,
  form,
  initialModel,
  scrollRef,
}: Props) => {
  const router = useRouter();
  const hasHydrated = useHasHydrated();
  const { t } = useTranslation(["common", "catalog"]);

  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const staggerContainer = {
    hidden: {
      transition: {
        ease: animEasingPrimary,
        staggerChildren: 0.1,
      },
    },
    show: {
      transition: {
        ease: animEasingPrimary,
        staggerChildren: 0.1,
      },
    },
  };

  const staggerAnimation: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.4,
      },
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  function handleScroll() {
    const position = scrollRef.current.scrollTop;
    setScrollPosition(position);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useEffect(() => {
    if (configuratorValues) {
      scrollRef.current.scrollTo(0, scrollPosition);
    }
  }, [configuratorValues, scrollRef, scrollPosition]);

  return (
    <>
      {hasHydrated && (
        <motion.div
          style={{ color: initialModel?.brandColor }}
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {/* Brand / Model */}
          <motion.div variants={staggerAnimation}>
            <header className={`${styles["configurator-selector__header"]}`}>
              <div>
                {initialModel?.logoUrl && (
                  <Image
                    src={initialModel?.logoUrl}
                    alt={`${initialModel?.modelName} image`}
                    width={60}
                    height={35}
                    className={`${styles["configurator-selector__brand"]}`}
                  />
                )}

                <h1 className={`${styles["configurator-selector__title"]}`}>
                  {initialModel?.modelName}
                </h1>
                <span className={`${styles["configurator-selector__price"]}`}>
                  {isLoading ? (
                    <Skeleton className={`skeleton__line`} />
                  ) : (
                    <>{numberWithSpaces(configuratorValues?.price)}€ TTC</>
                  )}
                </span>
              </div>
              <div
                className={`${styles["configurator-selector__header__buttons"]}`}
              >
                {/* Switch model confirm dialog */}
                <AlertDialog.Root>
                  <AlertDialog.Trigger className={`alert-dialog__trigger`}>
                    {t("catalog:switch-model")}
                  </AlertDialog.Trigger>
                  <AlertDialog.Portal>
                    <AlertDialog.Overlay className={`alert-dialog__overlay`} />
                    <AlertDialog.Content className={`alert-dialog__content`}>
                      <h4>{t("catalog:switch-model-modal.title")}</h4>
                      <p>{t("catalog:switch-model-modal.text")}</p>
                      <footer className={`btn-list`}>
                        <AlertDialog.Action
                          asChild
                          onClick={() => {
                            router.push({
                              pathname: "/",
                              query: null,
                            });
                          }}
                        >
                          <span>
                            <ButtonWithoutLink>
                              {t("catalog:switch-model-modal.confirm")}
                            </ButtonWithoutLink>
                          </span>
                        </AlertDialog.Action>
                        <AlertDialog.Cancel asChild>
                          <span>
                            <ButtonWithoutLink style="btn--link">
                              {t("catalog:switch-model-modal.cancel")}
                            </ButtonWithoutLink>
                          </span>
                        </AlertDialog.Cancel>
                      </footer>
                    </AlertDialog.Content>
                  </AlertDialog.Portal>
                </AlertDialog.Root>
              </div>
            </header>
          </motion.div>

          {/* Finitions */}
          <motion.fieldset
            className={`${styles["configurator-selector__section"]}`}
            variants={staggerAnimation}
          >
            <div
              className={`flex justify-content--between align-items--center`}
            >
              <h2
                className={`${styles["configurator-selector__section__title"]}`}
              >
                {t("catalog:finishes")}
              </h2>
            </div>
            {isLoading && <Skeleton className={`skeleton__img`} count={2} />}
            {configuratorValues?.finishes?.map((item: any, index: number) => {
              return (
                <label
                  key={index}
                  htmlFor={`finish-${item.id}`}
                  data-is-selected={item.state.selected}
                >
                  <Icon src="icon-check" width={24} height={24} />
                  <div
                    className={`${styles["configurator-selector__section__content"]}`}
                  >
                    <h4
                      className={`${styles["configurator-selector__label-title"]}`}
                    >
                      {item.name}
                    </h4>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item.description,
                      }}
                    />
                  </div>
                  <div
                    className={`${styles["configurator-selector__section__price"]}`}
                  >
                    {formatChoicePrice(item)}
                  </div>
                  <input
                    type="radio"
                    value={item.id}
                    id={`finish-${item.id}`}
                    checked={item.state.selected}
                    {...form.register("finish", {
                      onChange: (e) => {
                        handleScroll();
                      },
                    })}
                  />
                </label>
              );
            })}
          </motion.fieldset>

          {/* Batteries */}
          <motion.fieldset
            className={`${styles["configurator-selector__section"]}`}
            variants={staggerAnimation}
          >
            <h2
              className={`${styles["configurator-selector__section__title"]}`}
            >
              {"Batteries"}
            </h2>
            {isLoading && <Skeleton className={`skeleton__img`} count={2} />}

            {configuratorValues?.batteries.map((item: any, index: number) => {
              return (
                <label
                  key={index}
                  htmlFor={`battery-${item.id}`}
                  data-is-selected={item.state.selected}
                >
                  <Icon src="icon-check" width={24} height={24} />
                  <div
                    className={`${styles["configurator-selector__section__content"]}`}
                  >
                    <h4
                      className={`${styles["configurator-selector__label-title"]}`}
                    >
                      {item.name}
                    </h4>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item.description,
                      }}
                    />
                  </div>
                  <div
                    className={`${styles["configurator-selector__section__price"]}`}
                  >
                    {formatChoicePrice(item)}
                  </div>
                  <input
                    type="radio"
                    value={item.id}
                    id={`battery-${item.id}`}
                    checked={item.state.selected}
                    {...form.register("battery", {
                      onChange: (e) => {
                        handleScroll();
                      },
                    })}
                  />
                </label>
              );
            })}
          </motion.fieldset>

          {/* Couleurs */}
          <motion.fieldset
            className={`${styles["configurator-selector__section"]}`}
            variants={staggerAnimation}
          >
            <h2
              className={`${styles["configurator-selector__section__title"]}`}
            >
              {t("catalog:colors")}
            </h2>
            {isLoading && (
              <div className={`skeleton__circle-wrap`}>
                <Skeleton className={`skeleton__circle`} count={3} />
              </div>
            )}
            <div className={`${styles["configurator-selector__color-list"]}`}>
              {configuratorValues?.colors?.map((item: any, index: number) => {
                return (
                  <label
                    key={index}
                    htmlFor={`color-${item.id}`}
                    data-is-selected={item.state.selected}
                  >
                    <span
                      className={`${
                        styles["configurator-selector__color-list__color"]
                      } ${
                        item.hexa === "999999"
                          ? styles[
                              "configurator-selector__color-list__color--mat"
                            ]
                          : ""
                      }`}
                      style={
                        item.hexa === "999999"
                          ? {
                              backgroundImage: `url(/images/color-wheel.jpg)`,
                            }
                          : { backgroundColor: `#${item.hexa}` }
                      }
                    />
                    <input
                      type="radio"
                      value={item.id}
                      id={`color-${item.id}`}
                      checked={item.state.selected}
                      {...form.register("color", {
                        onChange: (e) => {
                          handleScroll();
                        },
                      })}
                    />
                  </label>
                );
              })}

              {configuratorValues?.colors.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    className={`${styles["configurator-selector__color-list__data"]}`}
                  >
                    {item.state.selected && (
                      <>
                        <h4
                          className={`${styles["configurator-selector__color-list__title"]}`}
                        >
                          {item.name}
                        </h4>

                        <div
                          className={`${styles["configurator-selector__color-list__price"]}`}
                        >
                          {item.price === 0
                            ? `Inclus`
                            : formatChoicePrice(item)}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.fieldset>
          {isLoading && (
            <>
              {[...Array(3)].map((_, index: number) => {
                return (
                  <div key={index}>
                    <Skeleton className={`skeleton__line skeleton__title`} />
                    <Skeleton className={`skeleton__img`} count={2} />
                  </div>
                );
              })}
            </>
          )}
        </motion.div>
      )}
    </>
  );
};

export default ConfiguratorSelector;
