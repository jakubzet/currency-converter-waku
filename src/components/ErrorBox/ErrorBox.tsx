import type { ComponentProps } from "react";

import * as css from "./styles.module.css";

type Props = {
  message?: string;
};

export const ErrorBox = ({ message }: Props) => {
  if (!message?.length) {
    return null;
  }

  return (
    <section role="alert" className={css.box}>
      {message}
    </section>
  );
};
