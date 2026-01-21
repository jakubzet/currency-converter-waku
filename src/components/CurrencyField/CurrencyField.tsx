import { type ComponentProps, type ReactNode, useId } from "react";

import * as css from "./styles.module.css";

type Props = {
  children: ReactNode;
  label: string;
} & ComponentProps<"input">;

export const CurrencyField = ({
  children,
  label,
  defaultValue = "",
  readOnly = false,
  ...restProps
}: Props) => {
  const id = useId();

  return (
    <section
      className={css.field}
      data-display-only={readOnly ? "true" : "false"}
    >
      <label htmlFor={id} className={css.label}>
        {label}
      </label>

      <div className={css.content}>
        <input
          id={id}
          type="text"
          defaultValue={defaultValue}
          placeholder="How much?"
          readOnly={readOnly}
          autoComplete="off"
          {...restProps}
        />

        {children}
      </div>
    </section>
  );
};
