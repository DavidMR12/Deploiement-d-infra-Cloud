import Header from "@/components/global/Header/Header";
import useVH from "@/hooks/useVH";
import styles from "./LayoutConfigurator.module.scss";

type Props = {
  children: React.ReactNode;
};

const LayoutConfigurator = ({ children }: Props) => {
  useVH();

  return (
    <>
      <Header />
      <main className={`${styles["layout-configurator"]}`}>
        <div className={`${styles["layout-configurator__configurator"]}`}>
          {children}
        </div>
      </main>
    </>
  );
};

export default LayoutConfigurator;
