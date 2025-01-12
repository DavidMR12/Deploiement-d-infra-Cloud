import { useHasHydrated } from "@/hooks/useHasHydrated";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Header.module.scss";

type Props = {
  hasSwitch?: boolean;
  colorMode?: "white" | "transparent";
  className?: string;
};

const defaultProps: Props = {
  hasSwitch: false,
  colorMode: "white",
};

const Header = ({ colorMode, className }: Props) => {
  const router = useRouter();
  const hasHydrated = useHasHydrated();

  return (
    <>
      <header
        className={`${styles["app-header"]} ${className || ""}`}
        data-color-mode={colorMode}
      >
        <div className={`${styles["app-header__left-content"]}`}>
          {hasHydrated && (
            <Link
              className={`flex`}
              href={{
                pathname: "/",
                query: "",
              }}
            >
              <>
                <Image
                  className={`${styles["app-header__brand"]}`}
                  src="/images/logo.png"
                  alt="Quantum Motors"
                  width={96}
                  height={96}
                  priority
                />
              </>
            </Link>
          )}
        </div>

        <div className={`${styles["app-header__right-content"]}`}>
          {router.locales!.length > 1 ? (
            <ul
              className={`${styles["app-header__lang-switcher"]} list-unstyled`}
            >
              {hasHydrated && (
                <>
                  {router.locales?.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className={`${
                          router.locale === item
                            ? styles["app-header__lang-switcher__current"]
                            : ""
                        }`}
                      >
                        <Link
                          className={`${styles["app-header__lang-switcher__item"]} ${styles["app-header__lang-switcher__link"]}`}
                          href={{
                            pathname: "/",
                            query: null,
                          }}
                          locale={item}
                        >
                          {item.toUpperCase()}
                        </Link>
                      </li>
                    );
                  })}
                </>
              )}
            </ul>
          ) : null}
        </div>
      </header>
    </>
  );
};

Header.defaultProps = defaultProps;

export default Header;
