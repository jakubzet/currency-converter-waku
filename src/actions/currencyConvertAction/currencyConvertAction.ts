"use server";

import { SYMBOL_FROM, SYMBOL_TO, VALUE_FROM } from "../../constants/names";
import { createClient } from "../../lib/currencyClient";

const currencyClient = createClient();

export type CurrencyConvertAction = typeof currencyConvertAction;

const defaultActionState = {
  amount: 0,
  value: 0,
  from: "",
  to: "",
  error: "",
};

export const currencyConvertAction = async (
  prevState: typeof defaultActionState,
  formData: FormData,
) => {
  const actionState = { ...defaultActionState };

  if (formData.get(VALUE_FROM)) {
    actionState.amount = Number(formData.get(VALUE_FROM));
  }

  if (formData.get(SYMBOL_FROM)) {
    actionState.from = formData.get(SYMBOL_FROM)?.toString() ?? "";
  }

  if (formData.get(SYMBOL_TO)) {
    actionState.to = formData.get(SYMBOL_TO)?.toString() ?? "";
  }

  try {
    const { response, meta } =
      await currencyClient.convertCurrencies(actionState);

    if (meta.code === 200) {
      return { ...response, error: "" };
    } else {
      return { ...prevState, error: meta.error_detail };
    }
  } catch {
    return {
      ...prevState,
      error: "Unexpected error, please refresh the app and try again.",
    };
  }
};
