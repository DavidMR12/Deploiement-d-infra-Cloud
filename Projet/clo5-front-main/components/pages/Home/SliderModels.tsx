import { ButtonWithoutLink } from "@/components/ui/Buttons";
import { checkType, numberWithSpaces } from "lib/helpers";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Model } from "types/catalogTypes";
import styles from "./SliderModels.module.scss";

type Props = {
  models: Model[];
  selectedModel: Model;
  onModelSelect: (
    e: React.MouseEvent<HTMLButtonElement>,
    modelId: string
  ) => void;
};

const SliderModels = ({ models, selectedModel, onModelSelect }: Props) => {
  const { t } = useTranslation(["common", "catalog"]);
  const router = useRouter();

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={"auto"}
      className={`${styles["slider-models"]}`}
      modules={[Navigation]}
      navigation
    >
      {models.map((slide, index) => {
        return (
          <SwiperSlide
            key={index}
            className={`${styles["slider-models__card"]}`}
            data-is-selected={slide.id === selectedModel.id}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              onModelSelect(e, slide.id)
            }
          >
            <header className={`${styles["slider-models__card__header"]}`}>
              <figure className={`${styles["slider-models__card__image"]}`}>
                <Image
                  src={slide.image ? slide.image : "/images/default-car.jpeg"}
                  alt={`${slide.name} image`}
                  width={1024}
                  height={1024}
                />
              </figure>
            </header>
            <h2 className={`${styles["slider-models__card__title"]} text--lg`}>
              {slide.name}
            </h2>
            <p className={`${styles["slider-models__card__description"]}`}>
              <>
                {t("common:starting-from")} {numberWithSpaces(slide.price)}€ TTC
              </>
              <br />
              <>
                {"Type : "} {checkType(slide.type)}
              </>
            </p>

            <br />
            <ButtonWithoutLink
              className={`${styles["slider-models__card__button"]}`}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                router.push({
                  pathname: "/configure",
                  query: { model_id: slide.id },
                });
              }}
            >
              {t("common:configure")}
            </ButtonWithoutLink>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default SliderModels;
