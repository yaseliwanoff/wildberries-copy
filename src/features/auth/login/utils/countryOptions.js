import { getCountries, getCountryCallingCode } from "react-phone-number-input/input";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import ru from "react-phone-number-input/locale/ru.json";

export const COUNTRY_LIST = getCountries().map((code) => {
  const label = ru[code] || code;
  const callingCode = getCountryCallingCode(code);

  return {
    value: code,
    label,
    callingCode,
    flag: getUnicodeFlagIcon(code),
    searchText: `${label} ${code} +${callingCode} ${callingCode}`.toLowerCase(),
  };
});

export function filterCountries(searchQuery) {
  const normalizedSearch = searchQuery.trim().toLowerCase();

  if (!normalizedSearch) {
    return COUNTRY_LIST;
  }

  const digitsOnly = normalizedSearch.replace(/\D/g, "");

  return COUNTRY_LIST.filter((country) => {
    if (country.searchText.includes(normalizedSearch)) {
      return true;
    }

    if (!digitsOnly) {
      return false;
    }

    if (normalizedSearch.startsWith("+")) {
      return `+${country.callingCode}`.startsWith(
        normalizedSearch.replace(/\s/g, ""),
      );
    }

    return country.callingCode === digitsOnly;
  });
}
