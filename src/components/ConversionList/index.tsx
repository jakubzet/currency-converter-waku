import { RADIX_DECIMAL_PLACES } from "../../constants/currencyInput";

type Props = {
  // FIXME: perhaps to be refactored not to repeat types
  conversions: {
    id: number;
    from: string;
    to: string;
    amount: number;
    value: number;
  }[];
  limit?: number;
};

export function ConversionList({ conversions, limit = 5 }: Props) {
  if (!conversions?.length) {
    return <p>No conversions done yet</p>;
  }

  return (
    <div>
      {/* FIXME: Could be variable */}
      <p>Last {limit} conversions</p>
      <ol>
        {conversions.slice(0, limit).map((c) => (
          <li key={c.id}>
            <p>
              From {c.amount.toFixed(RADIX_DECIMAL_PLACES)} {c.from} to{" "}
              {c.value.toFixed(RADIX_DECIMAL_PLACES)} {c.to}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
