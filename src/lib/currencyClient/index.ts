import { API_BASE_URL } from "./constants";
import type {
  ConvertCurrenciesResponse,
  ConvertRequestParams,
  GetCurrenciesResponse,
} from "./types";

const API_KEY = process.env.API_KEY_CURRENCY_BEACON;

// NOTE: Based on info from https://currencybeacon.com/api-documentation, sadly no OpenAPI schema is exposed :(
export function createClient() {
  return {
    // TODO: Handle errors and abortController flow
    async getCurrencies() {
      const params = new URLSearchParams();

      params.append("api_key", API_KEY);

      const response = await fetch(`${API_BASE_URL}/currencies?${params}`);
      const data = await response.json();

      return data as GetCurrenciesResponse;
    },

    async convertCurrencies(conversionParams: ConvertRequestParams) {
      // TODO: Handle errors and abortController flow
      const params = new URLSearchParams();

      params.append("api_key", API_KEY);
      params.append("from", conversionParams.from);
      params.append("to", conversionParams.to);
      params.append("amount", conversionParams.amount.toString());

      const response = await fetch(`${API_BASE_URL}/convert?${params}`);
      const data = await response.json();

      return data as ConvertCurrenciesResponse;
    },
  };
}
