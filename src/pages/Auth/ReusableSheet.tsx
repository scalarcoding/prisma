import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetClose, 
  SheetContent, 
  SheetHeader, 
  SheetDescription, 
  SheetFooter, 
  SheetTitle, 
  SheetTrigger
} from "@/components/ui/sheet";
import LogoIcon from "/logoicon.svg"

interface AuthSheetProps {
  title:string;
  subtitle:string;
  submitCaption:string;
  trigger: React.ReactNode; // Trigger component, e.g., a button
  content?: React.ReactNode; // Optional custom content
  uselogo?: boolean;
}

export const ReusableSheet: React.FC<AuthSheetProps> = ({ trigger, title, subtitle, content, submitCaption, uselogo }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle><div className="flex flex-col justify-center items-center">
              { uselogo && <img src={LogoIcon} className="py-4 w-28"></img> }
              <h1>{title}</h1>
              </div>
              </SheetTitle>
            <SheetDescription>
              {subtitle}
            </SheetDescription>
          </SheetHeader>
          {content}
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">{submitCaption}</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
    
    </Sheet>
  );
};