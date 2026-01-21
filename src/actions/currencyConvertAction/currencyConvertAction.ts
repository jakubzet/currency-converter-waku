"use server";

import { SYMBOL_FROM, SYMBOL_TO, VALUE_FROM } from "../../constants/names";
import { createClient } from "../../lib/currencyClient";

const currencyClient = createClient();

export type CurrencyConvertAction = typeof currencyConvertAction;

const INITIAL_ACTION_STATE = {
  amount: 0,
  value: 0,
  from: "",
  to: "",
  error: "",
};

export const currencyConvertAction = async (
  prevState: typeof INITIAL_ACTION_STATE,
  formData: FormData,
) => {
  const params = { ...INITIAL_ACTION_STATE };

  if (formData.get(VALUE_FROM)) {
    params.amount = Number(formData.get(VALUE_FROM));
  }

  if (formData.get(SYMBOL_FROM)) {
    params.from = formData.get(SYMBOL_FROM)?.toString() ?? "";
  }

  if (formData.get(SYMBOL_TO)) {
    params.to = formData.get(SYMBOL_TO)?.toString() ?? "";
  }

  try {
    const { response, meta } = await currencyClient.convertCurrencies(params);

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
