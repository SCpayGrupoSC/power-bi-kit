import type { ComponentProps } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"a"> & {
  variant?: "default" | "outline" | "secondary";
};

export function DownloadLink({
  className,
  variant = "default",
  children,
  ...props
}: Props) {
  return (
    <a
      className={cn(buttonVariants({ variant }), className)}
      download
      {...props}
    >
      {children}
    </a>
  );
}
