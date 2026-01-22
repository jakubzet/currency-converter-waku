import * as APP_CONSTANTS from "../../constants/app";
import * as css from "./styles.module.css";

/** Application top part */
export const Header = () => {
  return (
    <header className={css.header}>
      <img src="/images/logo.svg" width="64px" height="64px" />

      <span role="heading" aria-level={1} className={css.logo}>
        <span>{APP_CONSTANTS.APP_TITLE_PREFIX}</span>
        <span className={css.headline}>{APP_CONSTANTS.APP_TITLE_SUFFIX}</span>
      </span>
    </header>
  );
};
