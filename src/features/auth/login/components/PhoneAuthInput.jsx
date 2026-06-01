import { useMemo, useState } from "react";
import PhoneInput from "react-phone-number-input";
import ru from "react-phone-number-input/locale/ru.json";
import { parsePhoneNumber } from "libphonenumber-js";
import PhoneCountrySelect from "./PhoneCountrySelect";
import { getPhonePlaceholder } from "../utils/phonePlaceholder";
import styles from "./PhoneAuthInput.module.scss";

function PhoneAuthInput({
  value,
  onChange,
  onCountryChange,
  defaultCountry = "RU",
  error,
}) {
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);

  const placeholder = useMemo(
    () => getPhonePlaceholder(selectedCountry),
    [selectedCountry],
  );

  const handleCountryChange = (country) => {
    if (!country) {
      return;
    }

    setSelectedCountry(country);
    onCountryChange?.(country);
  };

  const handlePhoneChange = (nextValue) => {
    onChange(nextValue);

    if (nextValue) {
      try {
        const phoneNumber = parsePhoneNumber(nextValue);

        if (phoneNumber?.country) {
          setSelectedCountry(phoneNumber.country);
          onCountryChange?.(phoneNumber.country);
        }
      } catch {
        alert("некорректный номер телефона, попробуйте другой");
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <PhoneInput
        international={false}
        countryCallingCodeEditable={false}
        defaultCountry={defaultCountry}
        country={selectedCountry}
        labels={ru}
        value={value || undefined}
        placeholder={placeholder}
        onChange={handlePhoneChange}
        onCountryChange={handleCountryChange}
        countrySelectComponent={PhoneCountrySelect}
        focusInputOnCountrySelection
        className={styles.phoneInput}
        numberInputProps={{
          className: styles.phoneInputField,
        }}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default PhoneAuthInput;
