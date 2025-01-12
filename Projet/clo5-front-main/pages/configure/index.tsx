import HeadCustom from "@/components/global/Head/Head";
import LayoutConfigurator from "@/components/global/LayoutConfigurator/LayoutConfigurator";
import ConfiguratorFooter from "@/components/pages/Configure/ConfiguratorFooter";
import ConfiguratorSelector from "@/components/pages/Configure/ConfiguratorSelector";
import ConfiguratorSlider from "@/components/pages/Configure/ConfiguratorSlider";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchConfigure, useConfigure } from "hooks";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useEffectOnce } from "react-use";
import { ChoicesConfiguration, InitialModel, Status } from "types/catalogTypes";
import styles from "../../components/global/LayoutConfigurator/LayoutConfigurator.module.scss";

export function Configure({}) {
  const router = useRouter();
  const { t } = useTranslation(["catalog"]);

  const configuratorLayoutEl = useRef(null);

  const [selectedChoices, setSelectedChoices] = useState<ChoicesConfiguration>(
    {}
  );
  const [activeTab, setActiveTab] = useState<string>("outside");
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const [initialModel, setInitialModel] = useState<InitialModel>({
    brandColor: "#59a600",
    modelName: "",
    logoUrl: "/images/logo.png",
  });

  const { data: configureData, isLoading: configureIsLoading } = useConfigure({
    code: router.query.model_id as string,
    choices: selectedChoices,
  });
  const form = useForm<ChoicesConfiguration>({
    defaultValues: {},
  });

  const handleChoicesSelect = useCallback(
    (value: ChoicesConfiguration, name: string) => {
      // Delete previous selected colors on finish and battery changes
      if (name === "finish" || name === "battery") {
        delete value.color;

        form.setValue("color", "");
      }

      // Reset battery on finish selection
      if (name === "finish") {
        delete value.battery;

        form.setValue("battery", "");
      }

      setSelectedChoices(value as ChoicesConfiguration);
    },
    [form]
  );

  const handleImageSwitch = useCallback(
    (value: ChoicesConfiguration, name: string) => {
      let activeImageCategory;
      let activeImageIndex;

      const setActiveImageAndCategory = (
        data: any,
        property: "finish" | "battery" | "color"
      ) => {
        const selectedItem = data.find(
          (item: any, index: number) => value[property] === item.code
        );

        if (selectedItem) {
          activeImageCategory = selectedItem.viewReference.category;
          setActiveTab(activeImageCategory);

          activeImageIndex = Object.keys(
            configureData?.value?.images[activeImageCategory]
          ).indexOf(selectedItem.viewReference.view);

          setActiveSlideIndex(activeImageIndex);
        }
      };

      switch (name) {
        case "finish":
          setActiveImageAndCategory(configureData?.value?.finishes, "finish");
          break;
        case "battery":
          setActiveImageAndCategory(configureData?.value?.batteries, "battery");
          break;
        case "color":
          setActiveImageAndCategory(configureData?.value.colors, "color");
          break;
      }
    },
    [configureData]
  );

  useEffect(() => {
    // Listen to configurator form updates
    const subscription = form.watch((value, { name, type }) => {
      if (type === "change") {
        handleChoicesSelect(value as ChoicesConfiguration, name as string);

        handleImageSwitch(value as ChoicesConfiguration, name as string);
      }
    });

    return () => subscription.unsubscribe();
  }, [form, handleImageSwitch, handleChoicesSelect]);

  useEffect(() => {}, [isDrawerOpen]);

  useEffect(() => {}, [configureData?.value]);

  useEffectOnce(() => {
    setInitialModel({
      brandColor: "#59a600", // Default color if no color is selected
      modelName: configureData?.value?.model.name,
      logoUrl: "/images/logo.png",
    });
  });

  // Vehicle combination not found
  if (
    configureData?.status === Status.MODEL_NOT_FOUND ||
    !router.query.model_id
  ) {
    return (
      <div
        className={`flex flex--col justify-content--center align-items--center`}
      >
        <h1 className={`text--danger text--center no-margin`}>
          {t("catalog:combination-not-found.title")}
        </h1>
        <p>{t("catalog:combination-not-found.text")}</p>
      </div>
    );
  }

  return (
    <>
      <ConfiguratorSlider
        image={configureData?.value?.image}
        color={initialModel?.brandColor}
        isLoading={configureIsLoading}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeSlideIndex={activeSlideIndex}
      />
      <div
        className={`${styles["layout-configurator__wrap"]}`}
        ref={configuratorLayoutEl}
      >
        <div className={`${styles["layout-configurator__wrap__content"]}`}>
          <ConfiguratorSelector
            configuratorValues={configureData?.value}
            isLoading={configureIsLoading}
            initialModel={initialModel}
            form={form}
            setDrawerOpen={setIsDrawerOpen}
            setActiveTab={setActiveTab}
            setActiveSlideIndex={setActiveSlideIndex}
            scrollRef={configuratorLayoutEl}
          />
        </div>
      </div>
      <ConfiguratorFooter
        configuratorValues={configureData?.value}
        isLoading={configureIsLoading}
        initialModel={initialModel}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    [
      "configure",
      {
        code: context.query.model_id,
        choices: {},
      },
    ],
    () =>
      fetchConfigure({
        code: context.query.model_id as string,
        choices: {},
      })
  );

  return {
    props: {
      ...(await serverSideTranslations(context.locale as string, [
        "common",
        "catalog",
      ])),
      dehydratedState: dehydrate(queryClient),
    },
  };
};

Configure.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutConfigurator>
      <HeadCustom />
      {page}
    </LayoutConfigurator>
  );
};

export default Configure;
