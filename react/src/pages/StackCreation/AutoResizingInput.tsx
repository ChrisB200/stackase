import { cn } from "@/lib/utils";
import { useState, useRef, useEffect, type InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> { }

function AutoResizingInput({ ...props }: Props) {
  const [value, setValue] = useState("");
  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (spanRef.current && inputRef.current) {
      const width = spanRef.current.offsetWidth;
      inputRef.current.style.width = `${width + 10}px`;
    }
  }, [value]);

  return (
    <div className="inline-block relative">
      {/* hidden mirror element */}
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
        onChange={(e) => setValue(e.target.value.toUpperCase())}
        placeholder="GREATEST"
        className={cn(
          "bg-transparent border-b border-accent outline-none text-5xl text-foreground text-center",
          value.length === 0 ? "min-w-[260px]" : "",
        )}
        {...props}
      />
    </div>
  );
}

export default AutoResizingInput;
