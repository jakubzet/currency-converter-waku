import {
  API_CONVERT_ENDPOINT_URL,
  API_CURRENCIES_ENDPOINT_URL,
} from "./constants";
import type {
  ConvertCurrenciesResponse,
  ConvertRequestParams,
  GetCurrenciesResponse,
} from "./types";

export const key = process.env.API_KEY_CURRENCY_BEACON;

// NOTE: Based on info from https://currencybeacon.com/api-documentation, sadly no OpenAPI schema is exposed :(
export function createClient() {
  return {
    async getCurrencies() {
      const params = new URLSearchParams();

      params.append("api_key", key);

      const response = await fetch(`${API_CURRENCIES_ENDPOINT_URL}?${params}`);
      const data = await response.json();

      return data as GetCurrenciesResponse;
    },

    async convertCurrencies(conversionParams: ConvertRequestParams) {
      const params = new URLSearchParams();

      params.append("api_key", key);
      params.append("from", conversionParams.from);
      params.append("to", conversionParams.to);
      params.append("amount", conversionParams.amount.toString());

      const response = await fetch(`${API_CONVERT_ENDPOINT_URL}?${params}`);
      const data = await response.json();

      return data as ConvertCurrenciesResponse;
    },
  };
}
