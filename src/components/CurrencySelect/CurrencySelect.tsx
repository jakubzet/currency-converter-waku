import type { ComponentProps } from "react";

import * as css from "./styles.module.css";

type Props = {
  name: string;
  currencies: {
    code: string;
    name: string;
  }[];
} & ComponentProps<"select">;

export const CurrencySelect = ({
  name,
  defaultValue,
  currencies,
  ...restProps
}: Props) => {
  if (!currencies.length) {
    return null;
  }

  return (
    <select
      // NOTE: Added due to nasty bug in React 19: https://github.com/facebook/react/issues/30580#issuecomment-2537962675
      key={defaultValue?.toString()}
      name={name}
      className={css.select}
      defaultValue={defaultValue}
      {...restProps}
    >
      {currencies.map((currency) => (
        <option key={currency.code} value={currency.code}>
          {currency.name} ({currency.code})
        </option>
      ))}
    </select>
  );
};
