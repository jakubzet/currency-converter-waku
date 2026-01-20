import { currencyConvertAction } from "../actions/currencyConvertAction";
import { Converter } from "../components/Converter";
import { APP_TITLE } from "../constants/title";
import { createClient } from "../lib/currencyClient";

export default async function HomePage() {
  const data = await getData();

  return (
    <div>
      <title>{APP_TITLE}</title>

      <Converter
        currencies={data.currencies}
        formAction={currencyConvertAction}
      />
    </div>
  );
}

const getData = async () => {
  const currencyClient = createClient();
  const { response } = await currencyClient.getCurrencies();

  return {
    currencies: response.map((currency) => ({
      code: currency.short_code,
      name: currency.name,
    })),
  };
};

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
