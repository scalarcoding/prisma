import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input'; // Assuming you're using ShadCN Input component
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'; // Import these separately
import { FiSearch, FiX } from 'react-icons/fi';

type InputWithPopoverAndClearProps = {
  prefixPopoverContent: React.ReactNode; // Content to display in the popover
  onClear?: () => void; // Callback for clearing the input
} & React.ComponentProps<typeof Input>; // Spread the Input component props

const InputWithPopoverAndClear: React.FC<InputWithPopoverAndClearProps> = ({
  prefixPopoverContent,
  onClear,
  ...inputProps
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    setInputValue('');
    onClear?.();
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        {/* Prefix Popover Icon */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="absolute left-2 text-gray-400 hover:text-gray-600 focus:outline-none"
              type="button" // Prevent accidental form submission
            >
              <FiSearch />
            </button>
          </PopoverTrigger>
          <PopoverContent className="p-4 w-screen md:max-w-screen-sm min-h-60 flex bg-white rounded shadow-lg">
            {prefixPopoverContent}
          </PopoverContent>
        </Popover>

        {/* Input Field */}
        <Input
          ref={inputRef}
          {...inputProps}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={`pl-8 pr-8`} // Adjust padding for prefix and suffix
        />

        {/* Suffix Clear Icon */}
        {inputValue && (
          <button
            onClick={handleClear}
            className="absolute right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
            type="button" // Prevent accidental form submission
          >
            <FiX />
          </button>
        )}
      </div>
    </div>
  );
};

export default InputWithPopoverAndClear;
