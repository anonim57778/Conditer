import * as React from "react"

import { cn } from "~/lib/utils"
import { Button } from "./button"
import { Paperclip } from "lucide-react"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-2xl border border-primary bg-background px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-primary placeholder:text-base placeholder:font-medium placeholder:font-sans focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export interface InputProps extends React.ComponentProps<"input"> {
  className?: string;
}

export interface FileInputProps extends InputProps {
  files: File[] | undefined;
  setFiles: (f: File[]) => void;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, files, setFiles, placeholder, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    return (
      <>
        <Button
          onClick={() => inputRef.current?.click()}
          type="button"
          className={cn(
            "w-full justify-start",
            (files?.length ?? 0) > 1
              ? "text-foreground"
              : "text-muted-foreground",
          )}
        >
          <Paperclip />
          {(files?.length ?? 0) > 1
            ? files?.map((f) => f.name).join(", ")
            : placeholder}
        </Button>
        <input
          className="hidden"
          type="file"
          multiple
          accept="image/*"
          ref={inputRef}
          onChange={(e) => {
            setFiles(Array.from(e.target.files ?? []));
          }}
          {...props}
        />
      </>
    );
  },
);
FileInput.displayName = "FileInput";

export { Input }
