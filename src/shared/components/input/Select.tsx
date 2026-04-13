"use client";

import { cn } from "@/shared/utils/cn";
import { Check, ChevronDown } from "lucide-react";
import { type KeyboardEvent, type ReactNode, useEffect, useId, useRef, useState } from "react";

export type SelectOption<T extends string = string> = {
  value: T;
  label: string;
  disabled?: boolean;
};

export interface SelectProps<T extends string = string> {
  options: SelectOption<T>[];
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  error?: boolean;
  errorId?: string;
  placeholder?: string;
  startIcon?: ReactNode;
  disabled?: boolean;
  className?: string;
  name?: string;
  id?: string;
}

export const Select = <T extends string = string>({
  className,
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  error = false,
  errorId,
  placeholder,
  startIcon,
  disabled = false,
  name,
  id,
}: SelectProps<T>) => {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<T | "">(defaultValue ?? "");
  const currentValue = isControlled ? (controlledValue as T | "") : internalValue;

  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const listId = useId();
  const buttonId = id ?? useId();

  const selectedOption = options.find((o) => o.value === currentValue) ?? null;

  const closeDropdown = () => {
    setOpen(false);
    setFocusedIndex(-1);
  };

  const selectOption = (option: SelectOption<T>) => {
    if (option.disabled) return;
    if (!isControlled) setInternalValue(option.value);
    onChange?.(option.value);
    closeDropdown();
    buttonRef.current?.focus();
  };

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) closeDropdown();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, closeDropdown]);

  // Scroll focused item into view
  useEffect(() => {
    if (!open || focusedIndex < 0) return;
    const item = listRef.current?.children[focusedIndex] as HTMLElement | undefined;
    item?.scrollIntoView({ block: "nearest" });
  }, [focusedIndex, open]);

  const enabledOptions = options.filter((o) => !o.disabled);

  const handleButtonKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (disabled) return;

    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
      setOpen(true);
      const idx = options.findIndex((o) => o.value === currentValue);
      setFocusedIndex(idx >= 0 ? idx : 0);
    } else if (e.key === "ArrowUp") {
      setOpen(true);
      setFocusedIndex(options.length - 1);
    }
  };

  const handleListKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    e.preventDefault();

    if (e.key === "Escape") {
      closeDropdown();
      buttonRef.current?.focus();
    } else if (e.key === "ArrowDown") {
      setFocusedIndex((prev) => {
        let next = prev + 1;
        while (next < options.length && options[next].disabled) next++;
        return next < options.length ? next : prev;
      });
    } else if (e.key === "ArrowUp") {
      setFocusedIndex((prev) => {
        let next = prev - 1;
        while (next >= 0 && options[next].disabled) next--;
        return next >= 0 ? next : prev;
      });
    } else if (e.key === "Enter" || e.key === " ") {
      if (focusedIndex >= 0) selectOption(options[focusedIndex]);
    } else if (e.key === "Tab") {
      closeDropdown();
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Hidden native input for form compatibility */}
      {name ? <input type="hidden" name={name} value={currentValue} /> : null}

      {startIcon ? (
        <div className="text-muted pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3">
          {startIcon}
        </div>
      ) : null}

      {/* Trigger button */}
      <button
        ref={buttonRef}
        id={buttonId}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-invalid={error}
        aria-describedby={error ? errorId : undefined}
        disabled={disabled}
        onClick={() => {
          if (disabled) return;
          const next = !open;
          setOpen(next);
          if (next) {
            const idx = options.findIndex((o) => o.value === currentValue);
            setFocusedIndex(idx >= 0 ? idx : 0);
          } else {
            setFocusedIndex(-1);
          }
        }}
        onKeyDown={handleButtonKeyDown}
        className={cn(
          "border-outline-variant bg-surface-input flex h-12 w-full items-center rounded-lg border text-base transition-all",
          "text-foreground ring-offset-background",
          "hover:border-primary/40",
          "focus-visible:ring-primary/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          open && "border-primary/60 ring-primary/30 ring-offset-background ring-2 ring-offset-2",
          startIcon ? "pl-10" : "pl-4",
          "pr-10",
          error ? "border-red-500/60 hover:border-red-500/60 focus-visible:ring-red-400/50" : "",
          className
        )}
      >
        <span className={cn("flex-1 truncate text-left", !selectedOption && "text-muted")}>
          {selectedOption ? selectedOption.label : (placeholder ?? "")}
        </span>
      </button>

      {/* Chevron */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <ChevronDown
          className={cn(
            "size-4 transition-all duration-200",
            open ? "text-primary rotate-180" : "text-muted"
          )}
        />
      </div>

      {/* Dropdown */}
      {open ? (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-labelledby={buttonId}
          tabIndex={-1}
          onKeyDown={handleListKeyDown}
          className={cn(
            "absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-lg border p-2",
            "border-outline-variant bg-surface-input shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-sm",
            "focus:outline-none"
          )}
        >
          {enabledOptions.length === 0 && options.length === 0 ? (
            <li className="text-muted rounded-md px-3 py-2 text-sm">No options</li>
          ) : null}
          {options.map((option, index) => {
            const isSelected = option.value === currentValue;
            const isFocused = focusedIndex === index;
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                aria-disabled={option.disabled}
                onClick={() => selectOption(option)}
                onMouseEnter={() => !option.disabled && setFocusedIndex(index)}
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-base transition-colors",
                  option.disabled ? "text-muted/40 cursor-not-allowed" : "text-foreground",
                  isFocused && !option.disabled && "bg-surface-hover",
                  isSelected && !option.disabled && "text-primary"
                )}
              >
                <span className={cn("truncate", options.length - 1 !== index && "mb-0.5")}>
                  {option.label}
                </span>
                {isSelected ? <Check className="text-primary size-4 shrink-0" /> : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

Select.displayName = "Select";
