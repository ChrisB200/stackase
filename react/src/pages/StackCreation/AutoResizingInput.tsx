import { cn } from "@/lib/utils";
import {
  useState,
  useRef,
  useEffect,
  type ChangeEvent,
  type InputHTMLAttributes,
} from "react";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "value"> {
  value?: string;
  defaultValue?: string;
}

function AutoResizingInput({
  value: controlledValue,
  defaultValue = "",
  onChange,
  ...props
}: Props) {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internal;
  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (spanRef.current && inputRef.current) {
      const width = spanRef.current.offsetWidth;
      inputRef.current.style.width = `${width + 10}px`;
    }
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value.toUpperCase();
    if (isControlled) {
      onChange?.({ ...e, target: { ...e.target, value: next } });
    } else {
      setInternal(next);
      onChange?.({ ...e, target: { ...e.target, value: next } });
    }
  };

  return (
    <div className="inline-block relative">
      <span
        ref={spanRef}
        className="invisible absolute whitespace-pre text-5xl text-accent"
      >
        {value || "GREATEST"}
      </span>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="TYPE HERE"
        className={cn(
          "bg-transparent border-b border-accent outline-none text-5xl text-foreground text-center",
          value.length === 0 ? "min-w-[250px]" : "",
        )}
        {...props}
      />
    </div>
  );
}

export default AutoResizingInput;
