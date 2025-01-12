import Footer from "@/components/global/Footer/Footer";
import Header from "@/components/global/Header/Header";
import useVH from "@/hooks/useVH";
import styles from "./LayoutDefault.module.scss";

type Props = {
  children: React.ReactNode;
};

const LayoutDefault = ({ children }: Props) => {
  useVH();

  return (
    <>
      <Header />
      <main className={`${styles["layout-default"]}`}>
        <div className={`${styles["layout-default__wrap"]}`}>{children}</div>
        <Footer className={`${styles["layout-default__footer"]}`} />
      </main>
    </>
  );
};

export default LayoutDefault;
