import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Props for reusable popover component
interface ReusablePopoverProps {
  trigger: React.ReactNode;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  width?: string; // Optional width prop
}

export function ReusablePopover({
  trigger,
  title,
  subtitle,
  content,
  width = "w-80", // Default width class
}: ReusablePopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className={width}>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="popover__title font-medium leading-none">{title}</h4>
            {subtitle && (
              <p className="popover__subtitle text-sm text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
          <div className="popover__content grid gap-2">{content}</div>
        </div>
      </PopoverContent>
     
    </Popover>
  );
}
