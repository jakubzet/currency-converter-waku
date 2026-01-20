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
import * as css from "./styles.module.css";

type Props = {
  currencies: ComponentProps<typeof CurrencySelect>["currencies"];
  formAction: CurrencyConvertAction;
};

export const Converter = ({ currencies, formAction }: Props) => {
  const [actionState, action, isPending] = useActionState(formAction, {
    amount: DEFAULT_VALUE,
    from: DEFAULT_SYMBOL_FROM,
    to: DEFAULT_SYMBOL_TO,
    value: DEFAULT_VALUE,
  });

  const formRef = useRef<HTMLFormElement>(null);

  const fromFieldValue = actionState.amount
    ? actionState.amount.toString()
    : "";

  const targetFieldValue = actionState.value
    ? actionState.value.toFixed(2)
    : "";

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
          defaultValue={fromFieldValue}
          onChange={handleFormControlUpdate}
        >
          <CurrencySelect
            name={SYMBOL_FROM}
            currencies={currencies}
            defaultValue={actionState.from}
            onChange={handleFormControlUpdate}
          />
        </CurrencyField>

        <CurrencyField label="Output" readOnly defaultValue={targetFieldValue}>
          <CurrencySelect
            name={SYMBOL_TO}
            currencies={currencies}
            defaultValue={actionState.to}
            onChange={handleFormControlUpdate}
          />
        </CurrencyField>
      </div>

      <button type="submit" hidden>
        Submit
      </button>
    </form>
  );
};
