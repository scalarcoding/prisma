import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "@/types/user";

interface DialogButtonProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  subtitle?: string;
  content: React.ReactNode; // Custom content for the dialog
  onSave: (values: User) => void; // Submission handler
  triggerButton: React.ReactNode; // Button to open the dialog
  HeroLogo?: string; // Path to the logo
}

const AuthDialogButton: React.FC<DialogButtonProps> = ({
  open,
  setOpen,
  title,
  subtitle,
  content,
  onSave,
  triggerButton,
  HeroLogo,
}) => {
  const handleSave = (values: User) => {
    setOpen(false);
    onSave(values);
  };

  return (
    <>
      {/* Trigger button */}
      <div onClick={() => setOpen(true)}>{triggerButton}</div>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            {/* Render the HeroLogo */}
            {HeroLogo && <img src={HeroLogo} alt="Hero Logo" className="w-24 my-4" />}
            <DialogTitle>{title}</DialogTitle>
            {subtitle && <DialogDescription>{subtitle}</DialogDescription>}
          </DialogHeader>
          {/* Pass handleSave to the custom content */}
          {React.cloneElement(content as React.ReactElement, { onSave: handleSave })}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthDialogButton;
