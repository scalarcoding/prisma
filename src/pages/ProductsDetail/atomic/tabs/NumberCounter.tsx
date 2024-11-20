import React, { useState } from "react";
import { TbMinus, TbPlus } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NumberCounter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count > 0 ? count - 1 : 0);

  return (
    <div className="w-full max-w-sm mx-auto border border-slate-400 h-10 rounded-lg flex justify-between items-center px-2">
      <Button onClick={decrement} variant="ghost" className=""><TbMinus/></Button>
      <Input className="text-center" value={count}></Input>
      <Button onClick={increment} variant="ghost" className=""><TbPlus/></Button>
    </div>
  );
};

export default NumberCounter;
