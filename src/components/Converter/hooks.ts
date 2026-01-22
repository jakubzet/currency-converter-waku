import { useRef } from "react";

import { RADIX_SEPARATOR } from "../../constants/currencyInput";

/** Helps to preserve initial (string) form of entered value, as API always returns numeric one (so e.g. 10.0 -> 10) */
export const useCurrencyInputRadix = () => {
  const includeSeparatorRef = useRef(false);
  const decimalPlacesCountRef = useRef(0);

  return {
    decimalPlaces: decimalPlacesCountRef.current,
    suffix: includeSeparatorRef.current ? RADIX_SEPARATOR : "",

    saveCurrencyInputRadixInfo(inputValue: string) {
      decimalPlacesCountRef.current =
        inputValue.split(RADIX_SEPARATOR).at(1)?.length ?? 0;

      includeSeparatorRef.current = inputValue.endsWith(RADIX_SEPARATOR);
    },
  };
};
