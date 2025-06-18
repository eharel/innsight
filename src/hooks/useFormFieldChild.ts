import {
  ReactElement,
  ReactNode,
  cloneElement,
  isValidElement,
  useId,
} from "react";

/**
 * Extracts or generates an `id` from a given child component (e.g. an <Input />),
 * and returns a clone of that component with the ID injected — so that a parent
 * component like `<FormField>` can properly bind `<label htmlFor={id}>` to the input.
 *
 * @param htmlFor Optional manual ID override (if provided, it is used as-is)
 * @param children The child form element passed into FormField (e.g. <Input />)
 * @returns An object with the final `id` and a `modifiedChild` node with that ID injected
 */
export default function useFormFieldChild(
  htmlFor?: string,
  children?: ReactNode
): { id: string; modifiedChild: ReactNode } {
  const autoId = useId();

  // If the user explicitly provided an htmlFor ID, use it without modifying the child
  if (htmlFor) return { id: htmlFor, modifiedChild: children };

  if (isValidElement(children) && hasIdProp(children)) {
    const existingId = children.props.id;

    // Use the existing ID if present
    if (typeof existingId === "string") {
      return { id: existingId, modifiedChild: children };
    }

    // Inject the generated ID via cloneElement (requires proper typing)
    const cloned = cloneElement(children as ReactElement<any>, {
      id: autoId,
    });

    return { id: autoId, modifiedChild: cloned };
  }

  // If the child isn't a valid React element, just return the fallback ID and the raw child
  return { id: autoId, modifiedChild: children };
}

/**
 * Type guard to check if the React element has an `id` prop
 */
function hasIdProp(
  element: ReactElement
): element is ReactElement<{ id?: string }> {
  return (
    typeof element.props === "object" &&
    element.props !== null &&
    "id" in element.props
  );
}
