import { memo, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ChevronDown, Search } from "lucide-react";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import { filterCountries } from "../utils/countryOptions";
import styles from "./PhoneCountrySelect.module.scss";

const ROW_HEIGHT = 44;

const CountryOption = memo(function CountryOption({ option, isSelected, onSelect }) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={isSelected}
      className={`${styles.option} ${isSelected ? styles.optionSelected : ""}`}
      onClick={() => onSelect(option.value)}
    >
      <span className={styles.optionFlag} aria-hidden>
        {option.flag}
      </span>
      <span className={styles.optionLabel}>{option.label}</span>
      <span className={styles.optionCode}>+{option.callingCode}</span>
    </button>
  );
});

function PhoneCountrySelect({
  value,
  onChange,
  disabled,
  readOnly,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef(null);
  const listRef = useRef(null);

  const deferredSearch = useDeferredValue(search);

  const selectedCountry = useMemo(
    () => filterCountries("").find((country) => country.value === value),
    [value],
  );

  const filteredOptions = useMemo(
    () => filterCountries(deferredSearch),
    [deferredSearch],
  );

  const virtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 8,
    enabled: isOpen,
  });

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
        setSearch("");
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      virtualizer.scrollToIndex(0);
    }
  }, [deferredSearch, isOpen, virtualizer]);

  const handleSelect = (country) => {
    onChange(country);
    setIsOpen(false);
    setSearch("");
  };

  const handleToggle = () => {
    setIsOpen((prev) => {
      if (prev) {
        setSearch("");
      }

      return !prev;
    });
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.root} ${isOpen ? styles.rootOpen : ""}`}
    >
      <button
        type="button"
        className={styles.trigger}
        onClick={handleToggle}
        disabled={disabled || readOnly}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={selectedCountry?.label ?? "Выбор страны"}
      >
        {value && (
          <span className={styles.flag} aria-hidden>
            {selectedCountry?.flag ?? getUnicodeFlagIcon(value)}
          </span>
        )}
        <ChevronDown
          size={16}
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
          aria-hidden
        />
      </button>

      {isOpen && (
        <div
          className={styles.dropdown}
          role="listbox"
          onPointerDown={(event) => event.stopPropagation()}
        >
          <div className={styles.search}>
            <Search size={16} aria-hidden />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Поиск страны"
              autoFocus
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          {filteredOptions.length > 0 ? (
            <div ref={listRef} className={styles.list}>
              <ul
                className={styles.listInner}
                style={{ height: `${virtualizer.getTotalSize()}px` }}
              >
                {virtualizer.getVirtualItems().map((virtualItem) => {
                  const option = filteredOptions[virtualItem.index];

                  return (
                    <li
                      key={option.value}
                      className={styles.listItem}
                      style={{
                        height: `${virtualItem.size}px`,
                        transform: `translateY(${virtualItem.start}px)`,
                      }}
                    >
                      <CountryOption
                        option={option}
                        isSelected={option.value === value}
                        onSelect={handleSelect}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <p className={styles.empty}>Страна не найдена</p>
          )}
        </div>
      )}
    </div>
  );
}

export default memo(PhoneCountrySelect);
