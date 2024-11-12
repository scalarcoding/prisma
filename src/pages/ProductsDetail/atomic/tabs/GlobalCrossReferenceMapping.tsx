import InputWithIcon from "@/components/ui/inputwithicon"
import ComboBox from "@/components/ui/header/combobox/combobox"
import { TbMenu2 } from "react-icons/tb"
import { ComboBoxProperties } from "@/components/ui/header/combobox/comboboxprops"

const GlobalCrossReferenceMapping = () => {

    const xrefType:ComboBoxProperties[] = [
        {
            value: "registernumber",
            label: "Register Number"
        },
        {
            value: "partnumber",
            label: "Part Number"
        },
    ];
    const xrefMethod:ComboBoxProperties[] = [
        {
            value: "xrefa",
            label: "Xref A -> B"
        },
        {
            value: "xrefb",
            label: "Xref B -> A"
        },
        {
            value: "xrefc",
            label: "Xref A <-> B"
        },
    ]


  return (
    <div className="py-4 gap-2 flex w-full md:flex-row flex-col">
      <div className="flex w-full gap-2">
      <ComboBox comboboxProperties={xrefType} title="XRef Type"/>
      <ComboBox comboboxProperties={xrefMethod} title="XRef Method"/>
      </div>
      <div className="xref__input flex w-full">
        <InputWithIcon icon={<TbMenu2/>} iconPosition="suffix" placeholder="Input Cross Reference B"/>
      </div>
    </div>
  )
}

export default GlobalCrossReferenceMapping
