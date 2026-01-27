"use client";

import {
  ChangeEventHandler,
  type ComponentProps,
  FocusEventHandler,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDebouncedCallback } from "use-debounce";

import {
  CURRENCY_CONVERT_ACTION_INITIAL_STATE,
  type CurrencyConvertAction,
} from "../../actions/currencyConvertAction";
import { RADIX_DECIMAL_PLACES } from "../../constants/currencyInput";
import * as FORM_NAME from "../../constants/formNames";
import { ConversionList } from "../ConversionList";
import { CurrencyField } from "../CurrencyField";
import { CurrencySelect } from "../CurrencySelect";
import { InfoBox } from "../InfoBox";
import { INPUT_UPDATE_DEBOUNCE_TIME_MS } from "./constants";
import { useCurrencyInputRadix } from "./hooks";
import * as css from "./styles.module.css";

type Props = {
  currencies: ComponentProps<typeof CurrencySelect>["currencies"];
  formAction: CurrencyConvertAction;
};

/** Main application component, allows to convert currencies */
export const Converter = ({ currencies, formAction }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);

  const { saveCurrencyInputRadixInfo, decimalPlaces, suffix } =
    useCurrencyInputRadix();

  const [state, action, isPending] = useActionState(
    formAction,
    CURRENCY_CONVERT_ACTION_INITIAL_STATE,
  );

  const [conversions, setConversions] = useState<Array<typeof state>>([]);

  const labelOutput = "Output" + (isPending ? " (loading...)" : "");

  const defaultValueInput = state.amount
    ? state.amount.toFixed(decimalPlaces) + suffix
    : "";

  const defaultValueOutput = state.value
    ? state.value.toFixed(RADIX_DECIMAL_PLACES)
    : "";

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

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    saveCurrencyInputRadixInfo(ev.currentTarget.value);

    const hasSameNumericValue =
      Number(defaultValueInput) === Number(ev.currentTarget.value);

    if (!hasSameNumericValue) {
      handleFormSubmitDebounced();
    }
  };

  const handleInputBlur: FocusEventHandler<HTMLInputElement> = (ev) => {
    saveCurrencyInputRadixInfo(ev.currentTarget.value);
  };

  useEffect(
    function watchForSubmissions() {
      console.log("## new submission", state);
      // TODO: Could move that magic number up
      setConversions((prev) => [state, ...prev.slice(0, 4)]);
    },
    [state],
  );

  return (
    <>
      <form ref={formRef} action={action}>
        <div className={css.converter}>
          <CurrencyField
            label="Input"
            name={FORM_NAME.CURRENCY_VALUE_FROM}
            defaultValue={defaultValueInput}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          >
            <CurrencySelect
              name={FORM_NAME.CURRENCY_SYMBOL_FROM}
              currencies={currencies}
              defaultValue={state.from}
              onChange={handleFormSubmit}
            />
          </CurrencyField>

          <CurrencyField
            label={labelOutput}
            readOnly
            defaultValue={defaultValueOutput}
          >
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
              `Input update is delayed by ${INPUT_UPDATE_DEBOUNCE_TIME_MS}ms to limit the API calls (it's not free for eternity, you know... ;)). See more in README.md`
            }
            hasError={!!state.error}
          />
        </div>

        {/* NOTE: Just to be able to submit without JS! */}
        <button type="submit" hidden />
      </form>

      {/* FIXME: Should use the timestamp from API results */}
      <ConversionList
        conversions={conversions.map((c) => ({ ...c, id: c.timestamp }))}
        limit={3}
      />
    </>
  );
};
