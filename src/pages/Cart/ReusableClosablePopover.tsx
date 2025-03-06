import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import React, { useState } from 'react';


// Props for reusable popover component
interface ReusableClosablePopoverProps {
    trigger: React.ReactNode;
    title: string;
    subtitle?: string;
    content: React.ReactNode;
    width?: string; // Optional width prop
  }

export function ReusableClosablePopover({
  trigger,
  title,
  subtitle,
  content,
  width = 'w-80', // Default width class
}: ReusableClosablePopoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    // Close the popover when Enter key is pressed
    if (event.key === 'Enter') {
      setIsOpen(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        className={width}
        onKeyDown={handleKeyPress} // Add event listener for keypress
        tabIndex={0} // Ensure PopoverContent can receive focus for key events
      >
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
