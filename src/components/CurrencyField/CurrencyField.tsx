import { type ComponentProps, type ReactNode, useId } from "react";
import { IMaskInput } from "react-imask";

import {
  RADIX_DECIMAL_PLACES,
  RADIX_SEPARATOR,
} from "../../constants/currencyInput";
import * as css from "./styles.module.css";

type Props = {
  children: ReactNode;
  label: string;
} & Pick<
  ComponentProps<"input">,
  "name" | "defaultValue" | "readOnly" | "onChange" | "children" | "onBlur"
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
          scale={RADIX_DECIMAL_PLACES}
          thousandsSeparator=""
          radix={RADIX_SEPARATOR}
          mapToRadix={[RADIX_SEPARATOR]}
          min={0}
          {...restProps}
        />

        {children}
      </div>
    </section>
  );
};
