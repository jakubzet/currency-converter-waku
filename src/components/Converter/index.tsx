import { type ComponentProps } from "react";

import { CurrencyField } from "../CurrencyField";
import { CurrencySelect } from "../CurrencySelect";
import * as css from "./styles.module.css";

type Props = {
  currencies: ComponentProps<typeof CurrencySelect>["currencies"];
};

export const Converter = ({ currencies }: Props) => {
  return (
    <section className={css.converter}>
      <CurrencyField label="Input">
        <CurrencySelect currencies={currencies} />
      </CurrencyField>

      <CurrencyField label="Output" displayOnly>
        <CurrencySelect currencies={currencies} />
      </CurrencyField>
    </section>
  );
};
