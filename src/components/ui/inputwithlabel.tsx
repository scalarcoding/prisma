import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


interface InputWithLabelProps{
    label:string;
    inputvalue:string;
    disabled:boolean;

}

const InputWithLabel:React.FC<InputWithLabelProps> =({label, inputvalue, disabled}) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">{label}</Label>
      <Input type="text" id={label} placeholder="" value={inputvalue} className={`disabled:${disabled}`}/>
    </div>
  )
}

export default InputWithLabel;
