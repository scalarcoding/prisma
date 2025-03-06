import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ButtonVariant } from "@/types/buttonvariant";



interface AlertDialogProps {
  valid?: boolean;
  buttonVariant?: ButtonVariant; // Strictly typed to match the Button's variants
  triggerText: string;
  title: string;
  description: string;
  cancelText: string;
  actionText: string;
  onAction: () => void; // Action handler for the "Continue" button
}

export const ReusableAlertDialog: React.FC<AlertDialogProps> = ({
  valid = true, // Default to true if not provided
  buttonVariant = "default", // Default to "default" if not provided
  triggerText,
  title,
  description,
  cancelText,
  actionText,
  onAction,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={buttonVariant} disabled={!valid}>{triggerText}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onAction}  >{actionText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
