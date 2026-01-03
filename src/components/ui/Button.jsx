import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className,
  isLoading,
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

  const variants = {
    primary:
      "bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/20 focus:ring-primary-500",
    secondary:
      "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 focus:ring-gray-200",
    danger:
      "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20 focus:ring-red-500",
    outline:
      "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500",
    ghost: "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    icon: "p-2",
  };

  return (
    <button
      className={twMerge(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
};

export default Button;
