import CustomError from "@/components/global/CustomError/CustomError";
import styles from "@/components/global/CustomError/CustomError.module.scss";
import LayoutDefault from "@/components/global/LayoutDefault/LayoutDefault";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";

const Custom404: NextPageWithLayout = () => {
  const { t } = useTranslation(["common"]);
  return (
    <>
      <CustomError>
        <h1
          className={`${styles["custom-error__title"]}`}
          dangerouslySetInnerHTML={{
            __html: t("common:404-page.title"),
          }}
        />
        <div
          dangerouslySetInnerHTML={{
            __html: t("common:404-page.content"),
          }}
        />
      </CustomError>
    </>
  );
};

Custom404.getLayout = function getLayout(page: ReactElement) {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient();

  return {
    props: {
      ...(await serverSideTranslations(context.locale as string, ["common"])),
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Custom404;
