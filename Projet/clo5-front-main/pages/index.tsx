import HeadCustom from "@/components/global/Head/Head";
import LayoutHome from "@/components/global/LayoutHome/LayoutHome";
import SelectedModel from "@/components/pages/Home/SelectedModel";
import SliderModels from "@/components/pages/Home/SliderModels";
import { fetchModels } from "hooks";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { Model } from "types/catalogTypes";

export function Homepage({ modelsData }: { modelsData: any }) {
  const router = useRouter();

  const [selectedModel, setSelectedModel] = useState<Model>(() => {
    return modelsData[0];
  });

  function setActiveModel(
    e: React.MouseEvent<HTMLButtonElement>,
    modelId: string
  ) {
    const selectedModelIndex = modelsData.findIndex(
      (element: Model) => element.id === modelId
    );

    setSelectedModel(modelsData[selectedModelIndex]);
  }

  useEffect(() => {
    setSelectedModel(modelsData[0]);
  }, [modelsData, setSelectedModel]);
  return (
    <>
      {!modelsData.isLoading ? (
        <>
          <SelectedModel selectedModel={selectedModel || modelsData} />
          <SliderModels
            selectedModel={selectedModel || modelsData}
            models={modelsData}
            onModelSelect={setActiveModel}
          />
        </>
      ) : null}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const models = await fetchModels();
  return {
    props: {
      ...(await serverSideTranslations(context.locale as string, [
        "common",
        "catalog",
      ])),
      modelsData: models.values,
    },
  };
};

Homepage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutHome>
      <HeadCustom />
      {page}
    </LayoutHome>
  );
};

export default Homepage;
