import type { ComponentProps } from "react";

import * as css from "./styles.module.css";

type Props = {
  message: string;
  hasError?: boolean;
};

export const ErrorBox = ({ message, hasError = false }: Props) => {
  return (
    <section
      role="alert"
      className={css.box}
      data-error={hasError ? "true" : "false"}
    >
      {message}
    </section>
  );
};
