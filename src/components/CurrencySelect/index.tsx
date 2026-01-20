import * as css from "./styles.module.css";

type Props = {
  currencies: {
    code: string;
    name: string;
  }[];
};

export const CurrencySelect = ({ currencies }: Props) => {
  if (!currencies.length) {
    return null;
  }

  return (
    <select className={css.select}>
      {currencies.map((currency) => (
        <option key={currency.code} value={currency.code}>
          {currency.code}
        </option>
      ))}
    </select>
  );
};
