"use server";

import * as FORM_NAME from "../../constants/formNames";
import { createClient } from "../../lib/currencyClient";
import { INITIAL_STATE } from "./constants";

const currencyClient = createClient();

export type CurrencyConvertAction = typeof currencyConvertAction;

export const currencyConvertAction = async (
  prevState: typeof INITIAL_STATE,
  formData: FormData,
) => {
  const params = { ...INITIAL_STATE };

  // NOTE: Would required more sophisticated validations in real-world use case
  if (formData.get(FORM_NAME.CURRENCY_VALUE_FROM)) {
    params.amount = Number(formData.get(FORM_NAME.CURRENCY_VALUE_FROM));
  }

  if (formData.get(FORM_NAME.CURRENCY_SYMBOL_FROM)) {
    params.from =
      formData.get(FORM_NAME.CURRENCY_SYMBOL_FROM)?.toString() ?? "";
  }

  if (formData.get(FORM_NAME.CURRENCY_SYMBOL_TO)) {
    params.to = formData.get(FORM_NAME.CURRENCY_SYMBOL_TO)?.toString() ?? "";
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
