import { type PropsWithChildren, useId } from "react";

import * as css from "./styles.module.css";

type Props = PropsWithChildren & {
  label: string;
  displayOnly?: boolean;
};

export const CurrencyField = ({
  children,
  label,
  displayOnly = false,
}: Props) => {
  const id = useId();

  return (
    <div
      className={css.field}
      data-display-only={displayOnly ? "true" : "false"}
    >
      <label htmlFor={id} className={css.label}>
        {label}
      </label>

      <div className={css.content}>
        <input
          id={id}
          type="text"
          placeholder="How much?"
          disabled={displayOnly}
          readOnly={displayOnly}
        />

        {children}
      </div>
    </div>
  );
};
