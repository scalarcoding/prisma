
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import SignupForm from "./SignupForm";
import { User } from "@/types/user";

interface SignUpDialogProps{
    onSave: (values: User) => void; // Updated to accept form values
    open: boolean;
    setOpen: (value:boolean)=> void;
    title:string;
    subtitle:string
    content?: React.ReactNode;
}

 const SignUpDialog:React.FC<SignUpDialogProps> = ({title, subtitle, open, setOpen, onSave})=> {
    const handleCloseDialog = (e: User) => {
        setOpen(false);
        // If you need to refresh data or state, handle it directly instead of reloading the page
        onSave(e);
      };
      
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {subtitle}
          </DialogDescription>
        </DialogHeader>
        <SignupForm onSave={handleCloseDialog}/>
      </DialogContent>
    </Dialog>
  )
}

export default SignUpDialog;