import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  wrapperClassName?: string;
  inputClassName?: string;
  fullWidth?: boolean;
}

const iconBaseClass =
  "absolute inset-y-0 flex items-center pointer-events-none";

// No need to repeat the type of ref or the type of props, as they are already defined in forwardRef
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      leftIcon,
      rightIcon,
      inputClassName = "",
      fullWidth = true,
      wrapperClassName = "",
      ...props
    },
    ref
  ) => {
    const widthClasses = fullWidth ? "w-full" : "";
    const iconPaddingClasses = [
      leftIcon ? "pl-10" : "",
      rightIcon ? "pr-10" : "",
      !leftIcon && !rightIcon ? "px-3" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={`relative flex items-center ${wrapperClassName}`}>
        {leftIcon && (
          <div aria-hidden="true" className={`${iconBaseClass} left-2`}>
            {leftIcon}
          </div>
        )}
        <input
          {...props}
          ref={ref}
          className={`${widthClasses} ${iconPaddingClasses} ${inputClassName}`}
        />
        {rightIcon && (
          <div aria-hidden="true" className={`${iconBaseClass} right-2`}>
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input"; // Required for displayName to work with forwardRef, and for debugging

export default Input;
