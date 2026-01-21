"use client";

import { type ComponentProps, useActionState, useRef } from "react";

import type { CurrencyConvertAction } from "../../actions/currencyConvertAction";
import {
  DEFAULT_SYMBOL_FROM,
  DEFAULT_SYMBOL_TO,
  DEFAULT_VALUE,
} from "../../constants/defaults";
import { SYMBOL_FROM, SYMBOL_TO, VALUE_FROM } from "../../constants/names";
import { CurrencyField } from "../CurrencyField";
import { CurrencySelect } from "../CurrencySelect";
import { ErrorBox } from "../ErrorBox";
import { OUTPUT_VALUE_DECIMAL_PLACES } from "./constants";
import * as css from "./styles.module.css";

type Props = {
  currencies: ComponentProps<typeof CurrencySelect>["currencies"];
  formAction: CurrencyConvertAction;
};

export const Converter = ({ currencies, formAction }: Props) => {
  const [state, action, isPending] = useActionState(formAction, {
    amount: DEFAULT_VALUE,
    from: DEFAULT_SYMBOL_FROM,
    to: DEFAULT_SYMBOL_TO,
    value: DEFAULT_VALUE,
    error: "",
  });

  const outputLabel = "Output" + (isPending ? "..." : "");
  const formRef = useRef<HTMLFormElement>(null);
  const fieldValueFrom = state.amount ? state.amount : "";

  const fieldValueTo = state.value
    ? state.value.toFixed(OUTPUT_VALUE_DECIMAL_PLACES)
    : "";

  const handleFormSubmit = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <form ref={formRef} action={action}>
      <div className={css.converter}>
        <CurrencyField
          label="Input"
          name={VALUE_FROM}
          defaultValue={fieldValueFrom}
          onChange={(ev) => {
            const hasSameNumericValue =
              Number(fieldValueFrom) === Number(ev.currentTarget.value);

            if (!hasSameNumericValue) {
              handleFormSubmit();
            }
          }}
        >
          <CurrencySelect
            name={SYMBOL_FROM}
            currencies={currencies}
            defaultValue={state.from}
            onChange={handleFormSubmit}
          />
        </CurrencyField>

        <CurrencyField label={outputLabel} readOnly defaultValue={fieldValueTo}>
          <CurrencySelect
            name={SYMBOL_TO}
            currencies={currencies}
            defaultValue={state.to}
            onChange={handleFormSubmit}
          />
        </CurrencyField>

        <ErrorBox message={state.error} />
      </div>

      {/* NOTE: Just to be able to submit without JS! */}
      <button type="submit" hidden />
    </form>
  );
};
