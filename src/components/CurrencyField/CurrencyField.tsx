import { type ComponentProps, type ReactNode, useId } from "react";
import { IMaskInput } from "react-imask";

import * as css from "./styles.module.css";

type Props = {
  children: ReactNode;
  label: string;
} & Pick<
  ComponentProps<"input">,
  "name" | "defaultValue" | "readOnly" | "onChange" | "children"
>;

/** Component including form field suitable for manipulating currency value */
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
        <IMaskInput
          id={id}
          type="text"
          defaultValue={defaultValue}
          placeholder="How much?"
          readOnly={readOnly}
          autoComplete="off"
          mask={Number}
          lazy={false}
          scale={2}
          thousandsSeparator=""
          radix="."
          mapToRadix={["."]}
          min={0}
          {...restProps}
        />

        {children}
      </div>
    </section>
  );
};
