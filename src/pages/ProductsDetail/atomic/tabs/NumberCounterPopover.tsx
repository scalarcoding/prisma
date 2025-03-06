import { Label } from "@/components/ui/label";
import NumberCounter from "./NumberCounter";
import { Button } from "@/components/ui/button";
import { ReusablePopover } from "./ReusablePopover";

interface NumberCounterPopoverProps {
  trigger: React.ReactNode; // Accept the trigger as a prop
}

export function NumberCounterPopover({ trigger }: NumberCounterPopoverProps) {
  return (
    <ReusablePopover
      trigger={trigger}
      title="Item Quantity"
      subtitle="Set item qty to order"
      width="w-96" // Custom width
      content={
        <>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label className="col-span-1" htmlFor="col-span">
              Qty
            </Label>
            <div className="w-full col-span-2">
              <NumberCounter />
            </div>
          </div>
          <div className="foldbuttons grid grid-cols-5 gap-2">
            <Button variant="secondary">1</Button>
            <Button variant="secondary">5</Button>
            <Button variant="secondary">10</Button>
            <Button variant="secondary">20</Button>
            <Button variant="secondary">100</Button>
          </div>
          <Button variant="outline">Set</Button>
        </>
      }
    />
  );
}
