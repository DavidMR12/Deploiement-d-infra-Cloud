import Header from "@/components/global/Header/Header";
import useVH from "@/hooks/useVH";
import { useRouter } from "next/router";
import styles from "./LayoutHome.module.scss";

type Props = {
  children: React.ReactNode;
};

const LayoutHome = ({ children }: Props) => {
  useVH();
  const router = useRouter();

  return (
    <>
      <main className={`${styles["layout-home"]}`}>
        <Header
          colorMode="transparent"
          className={`${styles["layout-home__header"]}`}
        />
        {children}
        {/* <Footer /> */}
      </main>
    </>
  );
};

export default LayoutHome;
