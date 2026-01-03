import { twMerge } from "tailwind-merge";

const DateInput = ({
  label,
  error,
  className,
  containerClassName,
  ...props
}) => {
  return (
    <div className={twMerge("w-full", containerClassName)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="date"
          className={twMerge(
            "w-full rounded-lg border outline-none transition-all disabled:opacity-50 disabled:bg-gray-50 pl-10 px-4 py-2",
            error
              ? "border-red-300 ring-2 ring-red-100 focus:border-red-500"
              : "border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100",
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default DateInput;
