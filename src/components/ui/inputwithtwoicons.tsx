import React from 'react';
import { Input } from '@/components/ui/input'; // Assuming you're using ShadCN Input component

type InputWithOptionalIconsProps = {
  prefixIcon?: React.ReactNode; // Optional prefix icon
  suffixIcon?: React.ReactNode; // Optional suffix icon
  onPrefixIconClick?: () => void; // Callback for prefix icon click
  onSuffixIconClick?: () => void; // Callback for suffix icon click
} & React.ComponentProps<typeof Input>; // Spread the Input component props

const InputWithTwoIcons: React.FC<InputWithOptionalIconsProps> = ({
  prefixIcon,
  suffixIcon,
  onPrefixIconClick,
  onSuffixIconClick,
  ...inputProps
}) => {
  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        {/* Prefix Icon */}
        {prefixIcon && (
          <button
            onClick={onPrefixIconClick}
            className="absolute left-2 text-gray-400 hover:text-gray-600 focus:outline-none"
            type="button" // Prevent accidental form submission
          >
            {prefixIcon}
          </button>
        )}

        {/* Input Field */}
        <Input
          {...inputProps}
          className={`${
            prefixIcon ? 'pl-8' : ''
          } ${suffixIcon ? 'pr-8' : ''}`} // Adjust padding based on icons
        />

        {/* Suffix Icon */}
        {suffixIcon && (
          <button
            onClick={onSuffixIconClick}
            className="absolute right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
            type="button" // Prevent accidental form submission
          >
            {suffixIcon}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputWithTwoIcons;
