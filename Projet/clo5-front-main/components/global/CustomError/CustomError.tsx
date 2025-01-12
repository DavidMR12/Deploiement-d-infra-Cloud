import styles from "@/components/global/CustomError/CustomError.module.scss";
import { ButtonWithLink } from "@/components/ui/Buttons";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const CustomError = ({ children }: Props) => {
  const { t } = useTranslation(["common"]);

  return (
    <div className={`${styles["custom-error"]}`}>
      <Image
        className={`${styles["custom-error__background"]}`}
        src="/images/error-background.jpeg"
        alt="Error"
        width={701}
        height={699}
      />
      <div className={`${styles["custom-error__content"]}`}>
        {children}
        <div className={`${styles["custom-error__buttons"]} btn-list`}></div>
      </div>
    </div>
  );
};

export default CustomError;
