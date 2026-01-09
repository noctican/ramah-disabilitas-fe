import { cn } from "@/lib/utils"

export const TitleSection = ({ children, className, ...props }: React.ComponentProps<"h3">) => {
  return (
    <h3 className={cn("text-lg font-semibold", className)} {...props}>{children}</h3>
  )
}