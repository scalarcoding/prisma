import React from 'react';
import { Input } from '@/components/ui/input'; // Assuming you're using ShadCN Input component

type InputWithIconProps = {
  iconPosition: 'prefix' | 'suffix'; // Defines if the icon is on the left (prefix) or right (suffix)
  onClickHandler?: () => void; // Callback for the icon click
  icon: React.ReactNode; // Prop to pass any React component (icon)
} & React.ComponentProps<typeof Input>; // Spread the Input component props

const InputWithIcon: React.FC<InputWithIconProps> = ({
  iconPosition,
  onClickHandler,
  icon, // Destructure the icon prop
  ...inputProps // Accept all other props for the Input component
}) => {
  return (
    <div className="relative w-full max-w-xs">
      <div className="relative flex items-center">
        {/* Conditionally render prefix or suffix icon */}
        {iconPosition === 'prefix' && (
          <button
            onClick={onClickHandler}
            className="absolute left-2 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {icon} {/* Render the passed icon */}
          </button>
        )}
        
        {/* Input Field */}
        <Input
          {...inputProps} // Spread all input props (value, onChange, etc.)
          className={`${
            iconPosition === 'prefix' ? 'pl-8' : ''
          } ${iconPosition === 'suffix' ? 'pr-8' : ''}`} // Adjust padding based on the icon position
        />

        {/* Suffix Icon */}
        {iconPosition === 'suffix' && (
          <button
            onClick={onClickHandler}
            className="absolute right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {icon} {/* Render the passed icon */}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputWithIcon;
