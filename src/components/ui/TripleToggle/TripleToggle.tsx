import React, { useState } from "react";
import "./TripleToggle.css"; // Add the required styles here

interface TripleToggleProps {
  enabled:boolean;
  initial:number;
  id:number;
  onChange: (value: number) => void; // Callback function to handle toggle changes
}

const TripleToggle: React.FC<TripleToggleProps> = ({id, initial,  onChange, enabled }) => {
  const [selected, setSelected] = useState<number>(initial); // Initial value is "Full" (0)

  const handleChange = (value: number) => {
    if(initial==1) return;
    if(initial==2 && value===0) return;
    setSelected(value);
    onChange(value); // Call the parent callback with the selected value
  };

  

  return (
    <div className={enabled  ? ""
      : "opacity-50 pointer-events-none"} >
      <div className="switch-toggle grid grid-cols-3 w-full" id={id.toString()}>
      <div className="full_input flex w-full">
      <input
        id={`full_supply_${id}`}
        name={`state-d_${id}`}
        type="radio"
        checked={selected === 0}
        onChange={() => handleChange(0)}
      />
      <label htmlFor={`full_supply_${id}`}>Full</label>
      </div>

      <div className="cancel_input flex w-full">
      <input
        id={`cancel_supply_${id}`}
        name={`state-d_${id}`}
        type="radio"
        checked={selected === 1}
        onChange={() => handleChange(1)}
      />
      <label htmlFor={`cancel_supply_${id}`}>Cancel</label>

      </div>
      <div className="partial_input flex w-full">
      <input
        id={`partial_supply_${id}`}
        name={`state-d_${id}`}
        type="radio"
        checked={selected === 2}
        onChange={() => handleChange(2)}
      />
      <label htmlFor={`partial_supply_${id}`}>Part</label>

      </div>
      <a></a>
    </div>
    { initial===1 && <div>
      <h1 className="text-red-600 flex w-full text-center items-center justify-center">Insufficient SOH</h1>
    </div> }
    </div>
  );
};

export default TripleToggle;
