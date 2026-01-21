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

  const formRef = useRef<HTMLFormElement>(null);
  const fieldValueFrom = state.amount ? state.amount.toString() : "";
  const fieldValueTo = state.value ? state.value.toFixed(2) : "";

  const handleFormControlUpdate = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <form ref={formRef} action={action}>
      <div className={css.converter}>
        <CurrencyField
          label="Input"
          readOnly={isPending}
          name={VALUE_FROM}
          defaultValue={fieldValueFrom}
          onChange={handleFormControlUpdate}
        >
          <CurrencySelect
            name={SYMBOL_FROM}
            currencies={currencies}
            defaultValue={state.from}
            onChange={handleFormControlUpdate}
          />
        </CurrencyField>

        <CurrencyField label="Output" readOnly defaultValue={fieldValueTo}>
          <CurrencySelect
            name={SYMBOL_TO}
            currencies={currencies}
            defaultValue={state.to}
            onChange={handleFormControlUpdate}
          />
        </CurrencyField>

        <ErrorBox message={state.error} />
      </div>

      {/* NOTE: Just to be able to submit without JS! */}
      <button type="submit" hidden>
        Submit
      </button>
    </form>
  );
};
