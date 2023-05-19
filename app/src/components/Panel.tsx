import { HTMLProps } from "react";

export function Panel({ children, className }: HTMLProps<HTMLDivElement>) {
  return (
    <div className={`panel ${className}`}>
      {children}
    </div>
  );
}
