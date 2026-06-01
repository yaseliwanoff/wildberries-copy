import { getExampleNumber } from "libphonenumber-js/max";
import examples from "libphonenumber-js/mobile/examples";

function normalizePlaceholder(mask) {
  return mask
    .replace(/-/g, " ")
    .replace(/^0\s/, "")
    .replace(/^8\s/, "")
    .trim();
}

export function getPhonePlaceholder(country = "RU") {
  try {
    const example = getExampleNumber(country, examples);

    if (!example) {
      return "000 000 00 00";
    }

    return normalizePlaceholder(example.formatNational().replace(/\d/g, "0"));
  } catch {
    return "000 000 00 00";
  }
}
