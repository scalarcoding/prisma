"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"

type CalendarFormProps = {
  value: Date | null
  onChange: (date: Date | null) => void  // Updated to accept null
  title?: string
  description?: string
  disabledDates?: (date: Date) => boolean
}

export function CalendarForm({
  value,
  onChange,
  title = "Pick a date",
  description,
  disabledDates,
}: CalendarFormProps) {

  const [open, setOpen] = useState(false) // Manage popover open/close state

  const formattedValue = value ? format(value, "PPP") : title

  const handleSelect = (selectedDate: Date | null | undefined) => {
    // Handle the case where selectedDate might be undefined
    if (selectedDate) {
      onChange(selectedDate)
      setOpen(false)  // Close the popover after selecting the date
    } else {
      onChange(null)  // Set to null if no date is selected
    }
  };

  return (
    <div className="space-y-8">
      <FormItem className="flex flex-col">
        <FormLabel>{title}</FormLabel>
        
        {/* Popover trigger with button */}
        <Popover open={open} onOpenChange={setOpen}> {/* Control popover visibility */}
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                className={cn(
                  "w-full pl-3 text-left font-normal",
                  !value && "text-muted-foreground"
                )}
              >
                {formattedValue}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>

          {/* Calendar Popup */}
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value || new Date()}
              onSelect={handleSelect}  // Use the updated handleSelect function
              disabled={disabledDates}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Optional description */}
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    </div>
  )
}
