"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ComboboxWithFilterProps {
  placeholder?: string; // Placeholder for the search input
  choices: { value: string; label: string }[]; // Choices passed as a prop
  onSelect: (selectedValue: string) => void;  // Callback to handle value selection
}

export function ComboboxWithFilter({ placeholder, choices, onSelect }: ComboboxWithFilterProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("") // This will hold the selected value
  const [inputValue, setInputValue] = React.useState("") // This will track the search input

  // Filter choices based on the inputValue
  const filteredChoices = choices.filter((choice) =>
    choice.label.toLowerCase().includes(inputValue.toLowerCase())
  )

  const handleSelect = (currentValue: string) => {
    setValue(currentValue)  // Update the selected value
    setInputValue("")       // Clear the input field after selection
    setOpen(false)          // Close the popover after selection
    onSelect(currentValue)  // Trigger the callback function
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? choices.find((choice) => choice.value === value)?.label || value
            : placeholder?? "Select"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search..."
            className="h-9"
            value={inputValue}
            onValueChange={setInputValue} // Update inputValue on change
          />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {filteredChoices.length > 0 ? (
                filteredChoices.map((choice) => (
                  <CommandItem
                    key={choice.value}
                    value={choice.value}
                    onSelect={() => handleSelect(choice.value)} // Select choice and update value
                  >
                    {choice.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === choice.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))
              ) : (
                <CommandItem
                  value={inputValue}
                  onSelect={() => handleSelect(inputValue)} // Allow selecting custom input
                >
                  Use "{inputValue}" as choice
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
