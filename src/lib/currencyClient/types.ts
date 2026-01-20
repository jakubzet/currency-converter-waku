type ResponseMetaField = {
  code: number;
  disclaimer: string;
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
  meta: ResponseMetaField;
  response: CurrencyResponseField[];
};

export type ConvertCurrenciesResponse = {
  meta: ResponseMetaField;
  response: ConversionResponseField;
};

export type ConvertRequestParams = {
  from: ConversionResponseField["from"];
  to: ConversionResponseField["to"];
  amount: ConversionResponseField["amount"];
};
