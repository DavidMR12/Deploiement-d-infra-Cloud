import { useHasHydrated } from "@/hooks/useHasHydrated";
import * as Tabs from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { animEasingPrimary } from "lib/globalConstants";
import { rgbDataURL } from "lib/placeholder";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./ConfiguratorSlider.module.scss";

type Props = {
  image: string;
  color: any;
  isLoading: boolean;
  activeTab: string;
  setActiveTab: (data: string) => void;
  activeSlideIndex: number;
};

const ConfiguratorSlider = ({
  image,
  color,
  isLoading,
  activeTab,
  setActiveTab,
  activeSlideIndex,
}: Props) => {
  const hasHydrated = useHasHydrated();
  const { t } = useTranslation(["catalog"]);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType>();
  const [outsideThumbsSwiperInstance, setOutsideThumbsSwiperInstance] =
    useState<SwiperType>();
  const [insideThumbsSwiperInstance, setInsideThumbsSwiperInstance] =
    useState<SwiperType>();
  const [clickedSlideIndex, setClickedSlideIndex] = useState<number | null>(0);

  const outsideIsolatedImages = [0, 1, 3];

  useEffect(() => {
    swiperInstance?.slideTo(activeSlideIndex);
  }, [activeSlideIndex, swiperInstance, image]);

  return (
    <>
      {hasHydrated && (
        <motion.div
          className={`${styles["configurator-slider"]}`}
          style={{ color: color }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: animEasingPrimary,
          }}
        >
          <Tabs.Root
            className={`app-tab`}
            value={activeTab}
            onValueChange={(value) => setActiveTab(value)}
          >
            {/* Tabs */}
            <Tabs.List
              className={`app-tabs__tab-list`}
              aria-label="Switch view"
            >
              <Tabs.Trigger
                className={`app-tabs__trigger`}
                value="outside"
                onClick={() => {
                  // Reset slide and thumb index on tab change
                  swiperInstance?.slideTo(0);
                  setClickedSlideIndex(0);
                }}
              ></Tabs.Trigger>
            </Tabs.List>

            {/* Tab 1 */}
            <Tabs.Content
              className={`app-tabs`}
              value="outside"
              data-isolated-image={
                clickedSlideIndex !== null &&
                outsideIsolatedImages.includes(clickedSlideIndex)
              }
            >
              {/* Gallery */}
              <Swiper
                spaceBetween={16}
                slidesPerView={1}
                onSwiper={setSwiperInstance}
                onSlideChange={(swiper) => {
                  outsideThumbsSwiperInstance?.slideTo(swiper.activeIndex);
                  setClickedSlideIndex(swiper.activeIndex);
                }}
                className={`${styles["configurator-slider__slider"]}`}
              >
                {isLoading ? (
                  <Image
                    className={`${styles["configurator-slider__loader"]}`}
                    src="/svg/loader.svg"
                    alt="Loading..."
                    width={80}
                    height={80}
                  />
                ) : (
                  <>
                    return (
                    <SwiperSlide
                      key={0}
                      className={`${styles["configurator-slider__slider__slide"]}`}
                      data-isolated-image={true}
                    >
                      <figure
                        className={`${styles["configurator-slider__img"]}`}
                      >
                        <Image
                          src={image}
                          width={1200}
                          height={675}
                          alt={"Image du véhicule"}
                          placeholder="blur"
                          blurDataURL={rgbDataURL(245, 245, 245)}
                        />
                      </figure>
                    </SwiperSlide>
                    );
                  </>
                )}
              </Swiper>
            </Tabs.Content>
          </Tabs.Root>
        </motion.div>
      )}
    </>
  );
};

export default ConfiguratorSlider;
