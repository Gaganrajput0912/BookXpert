import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChevronDown } from "lucide-react";

const SelectBox = ({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  error,
  className,
  disabled,
  ...props
}) => {
  return (
    <div className="w-full relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          disabled={disabled}
          className={twMerge(
            "w-full appearance-none px-4 py-2 pr-10 rounded-lg border bg-white outline-none transition-all cursor-pointer disabled:opacity-50 disabled:bg-gray-50",
            error
              ? "border-red-300 ring-2 ring-red-100 focus:border-red-500"
              : "border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100",
            !value && "text-gray-400",
            className
          )}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => {
            const isObject = typeof option === "object" && option !== null;
            const optValue = isObject ? option.value : option;
            const optLabel = isObject ? option.label : option;
            return (
              <option key={optValue} value={optValue}>
                {optLabel}
              </option>
            );
          })}
        </select>

        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
          <ChevronDown size={18} />
        </div>
      </div>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default SelectBox;
