"use client";

import {
  ChangeEvent,
  type ComponentProps,
  useActionState,
  useRef,
} from "react";
import { useDebouncedCallback } from "use-debounce";

import {
  CURRENCY_CONVERT_ACTION_INITIAL_STATE,
  type CurrencyConvertAction,
} from "../../actions/currencyConvertAction";
import * as FORM_NAME from "../../constants/formNames";
import { CurrencyField } from "../CurrencyField";
import { CurrencySelect } from "../CurrencySelect";
import { InfoBox } from "../InfoBox";
import {
  INPUT_UPDATE_DEBOUNCE_TIME_MS,
  OUTPUT_VALUE_DECIMAL_PLACES,
} from "./constants";
import * as css from "./styles.module.css";

type Props = {
  currencies: ComponentProps<typeof CurrencySelect>["currencies"];
  formAction: CurrencyConvertAction;
};

/** Main application component, allows to convert currencies */
export const Converter = ({ currencies, formAction }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, action, isPending] = useActionState(
    formAction,
    CURRENCY_CONVERT_ACTION_INITIAL_STATE,
  );

  const fieldValueFrom = state.amount ? state.amount : "";
  const fieldValueTo = state.value
    ? state.value.toFixed(OUTPUT_VALUE_DECIMAL_PLACES)
    : "";

  const outputLabel = "Output" + (isPending ? " (loading...)" : "");

  const handleFormSubmit = () => formRef.current?.requestSubmit();

  const handleFormSubmitDebounced = useDebouncedCallback(
    () => {
      handleFormSubmit();
    },
    INPUT_UPDATE_DEBOUNCE_TIME_MS,
    {
      debounceOnServer: true,
      leading: false,
      trailing: true,
    },
  );

  const handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const hasSameNumericValue =
      Number(fieldValueFrom) === Number(ev.currentTarget.value);

    if (!hasSameNumericValue) {
      handleFormSubmitDebounced();
    }
  };

  return (
    <form ref={formRef} action={action}>
      <div className={css.converter}>
        <CurrencyField
          label="Input"
          name={FORM_NAME.CURRENCY_VALUE_FROM}
          defaultValue={fieldValueFrom}
          onChange={handleInputChange}
        >
          <CurrencySelect
            name={FORM_NAME.CURRENCY_SYMBOL_FROM}
            currencies={currencies}
            defaultValue={state.from}
            onChange={handleFormSubmit}
          />
        </CurrencyField>

        <CurrencyField label={outputLabel} readOnly defaultValue={fieldValueTo}>
          <CurrencySelect
            name={FORM_NAME.CURRENCY_SYMBOL_TO}
            currencies={currencies}
            defaultValue={state.to}
            onChange={handleFormSubmit}
          />
        </CurrencyField>

        <InfoBox
          message={
            state.error ||
            "When input value is changed several times in short time, only the most recent value will be used (through debounce functionality)."
          }
          hasError={!!state.error}
        />
      </div>

      {/* NOTE: Just to be able to submit without JS! */}
      <button type="submit" hidden />
    </form>
  );
};
