import { forwardRef, FormHTMLAttributes } from "react";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  className?: string;
}

const Form = forwardRef<HTMLFormElement, FormProps>(function Form(
  { children, className = "", ...props },
  ref
) {
  return (
    <form {...props} className={`${className}`} ref={ref}>
      {children}
    </form>
  );
});

Form.displayName = "Form";

export default Form;
