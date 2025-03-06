import { Switch } from "@/components/ui/switch";
import { useState } from "react"

interface PoNumberSearchPanelProps{
  outstandingOnly?:boolean;
  startState? : boolean;
  oncheckedchange(check:boolean) : void;
}

const PoNumberSearchPanel:React.FC<PoNumberSearchPanelProps> = ({ outstandingOnly, startState, oncheckedchange }) => {

  const [ isOutstanding, setIsOutstanding ] = useState(startState && true)


  const handleCheckedChange = (e:boolean) =>{
    setIsOutstanding(e);
    oncheckedchange(e);
  }

  return (
    <div>
      <Switch disabled={outstandingOnly} checked={isOutstanding} onCheckedChange={handleCheckedChange}/>
      <h1>Search PO Number</h1>
    </div>
  )
}

export default PoNumberSearchPanel
