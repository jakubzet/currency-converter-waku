"use server";
import { SYMBOL_FROM, SYMBOL_TO, VALUE_FROM } from "../constants/names";
import { createClient } from "../lib/currencyClient";

const currencyClient = createClient();

export type CurrencyConvertAction = typeof currencyConvertAction;

const defaultActionState = {
  amount: 0,
  value: 0,
  from: "",
  to: "",
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
    const { response } = await currencyClient.convertCurrencies(actionState);

    return {
      amount: response.amount,
      value: response.value,
      to: response.to,
      from: response.from,
    };
  } catch (err) {
    // TODO: Handle error
    console.log("An error occurred in `currencyConvertAction`", err);

    return prevState;
  }
};
