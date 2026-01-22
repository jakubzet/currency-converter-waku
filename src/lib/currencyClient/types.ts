// NOTE: All types prepared basing on documentation of Currency Beacon API
type ResponseMetaField = {
  code: 200;
  disclaimer: string;
};

type ErrorMetaField = {
  code: 401 | 403 | 404 | 429 | 500;
  error_type: string;
  error_detail: string;
};

type CurrencyResponseField = {
  id: number;
  name: string;
  short_code: string;
  code: string;
  precision: number;
  subunit: number;
  symbol: string;
  symbol_first: boolean;
  decimal_mark: string;
  thousands_separator: string;
};

type ConversionResponseField = {
  timestamp: number;
  date: string;
  from: string;
  to: string;
  amount: number;
  value: number;
};

export type GetCurrenciesResponse = {
  meta: ResponseMetaField | ErrorMetaField;
  response: CurrencyResponseField[];
};

export type ConvertCurrenciesResponse = {
  meta: ResponseMetaField | ErrorMetaField;
  response: ConversionResponseField;
};

export type ConvertRequestParams = {
  from: ConversionResponseField["from"];
  to: ConversionResponseField["to"];
  amount: ConversionResponseField["amount"];
};
