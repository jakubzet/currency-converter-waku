import * as appTitle from "../../constants/title";
import * as css from "./styles.module.css";

export const Header = () => {
  return (
    <header className={css.header}>
      <img src="/images/logo.svg" width="64px" height="64px" />

      <span role="heading" aria-level={1} className={css.logo}>
        <span>{appTitle.PREFIX}</span>
        <span className={css.headline}>{appTitle.SUFFIX}</span>
      </span>
    </header>
  );
};
