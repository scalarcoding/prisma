// Button component to handle the action
import { Button, ButtonProps } from '@/components/ui/button';
import React from 'react';

type WRActionType = {
  label: string;
  handler: () => void;
};

interface ActionButtonProps extends ButtonProps {
    action: WRActionType;
  }
  
  const ActionButton: React.FC<ActionButtonProps> = ({ action, ...props }) => {
    return (
      <Button
        onClick={action.handler} 
        className={`text-white px-4 py-2 rounded-md transition duration-200 ${props.className || ""}`} 
        {...props} // Spread the remaining props (including variant, className, etc.)
      >
        {action.label}
      </Button>
    );
  };
  

export default ActionButton;
