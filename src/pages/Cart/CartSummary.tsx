import { Separator } from "@/components/ui/separator";
import { ComboboxWithFilter } from "./ComboBoxWithFilter";
import { ReusableAlertDialog } from "@/components/ui/alert/ReusableAlertDialog";
import { supabase } from "@/api/repository/supabase";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { generateNumberCombination } from "@/functions/generatePONumber";
import { convertWarehouseRequisitionCartArrayToWRItemArray } from "./WRItem";
import { ApprovalStatus } from "@/api/approval/approval_status";
import { useNavigate } from "react-router-dom";
import { hours } from "./deliverySchedule";

interface CartSummaryProps {
    total : number;
    validation: boolean;
    errorMessage: string;
    approvalMessage:string,
    approvalStatus:ApprovalStatus,
    dropPoint: string;
    receiver: string;
    schedule: number;
    orderedBy: string;
    setDropPoint: (value: string) => void;
    setReceiver: (value: string) => void;
    setSchedule: (value: number) => void;
  }
  
  const CartSummary: React.FC<CartSummaryProps> = ({
    total,
    validation,
    errorMessage,
    approvalMessage,
    approvalStatus,
    orderedBy,
    setDropPoint,
    setReceiver,
    setSchedule,
    dropPoint,
    receiver,
    schedule,
  }) => {
    

    const { user } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();



  

    const handleProceedCheckout =  async() =>{
      if (user?.lastActiveDistrict && user?.userid) {
          await checkOut();

       } else {
         toast({
           title: "User Error",
           variant: "destructive",
           description: "User information is missing. Please try again later.",
         });
         return;
       }

       

    }
  
  
    const checkOut = async () => {
      // (window.location.href = "/order/status")

      let lastWR = null;
      const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
      let attempt = 0;
      const maxAttempts = 10;


      do{
        console.log("Trying to check if the last WR has a lock token");

        // Check if the last PO has a lock token
              const { data, error } = await supabase
                .from("warehouse_requisitions")
                .select("wr_number, lock_token")
                .eq("district", user!.lastActiveDistrict)
                .order("id", { ascending: false })
                .limit(1);
            
              if (error) {
                console.error(error);
                toast({
                  title: "Error",
                  variant: "destructive",
                  description: "An error occurred while checking the purchase order. Please try again later.",
                });
                return;
              }

              if (!data || data.length === 0) {
                toast({
                  title: "No Warehouse Requisition",
                  variant: "destructive",
                  description: "No Warehouse Requisition found in the database.",
                });
                return;
              }

              lastWR = data[0];
              console.log(`Attempt ${attempt + 1}:`, lastWR);

              // Exit the loop if the lock_token is no longer present
              if (!lastWR.lock_token) break;

               // Wait for 2 seconds before retrying
              await delay(2000);
              attempt++;

              // Check if max attempts have been reached
      if (attempt >= maxAttempts) {
        toast({
          title: "Lock Token Still Exists",
          variant: "destructive",
          description: "The Warehouse Requisition is locked. Please try again later.",
        });
        return;
      }


        
      }while (lastWR.lock_token);
      // Continue to the next line of code
      console.log("Lock token no longer exists. Proceeding to the next step...");
      // Add your next steps here

      const token = localStorage.getItem("token");
    const { error: updateError } = await supabase
      .from("warehouse_requisitions")
      .update({ lock_token: token })
      .eq("wr_number", lastWR.wr_number);

      if (updateError) {
        console.error("Error updating lock token:", updateError.message);
        toast({
          title: "Update Error",
          variant: "destructive",
          description: "Failed to update the lock token. Please try again later.",
        });
        return;
      }

      try {
        // Generate the PO number
          const generatedWR = generateNumberCombination(lastWR.wr_number, 5);
          console.log(generatedWR);

          const token = localStorage.getItem("token");


        

        //prepare data for WR
        const wr_data = {
          issuing_cost: total,
          wr_number: generatedWR,
          district: user!.lastActiveDistrict,
          drop_point: dropPoint,
          receiver: receiver,
          schedule: schedule,
          ordered_by: orderedBy,
          lock_token: token,
          status: approvalStatus.approval_status,
        };

        //add WR Items

        const wr_items = user?.cart ? convertWarehouseRequisitionCartArrayToWRItemArray(user.cart, generatedWR, user.lastActiveDistrict) : [];


        console.log("WR Data :" , wr_data);
        console.log("WR Items :", wr_items);
        
        //Insert new WR
        const { data, error } = await supabase.rpc('insert_new_wr',{ wr_data, wr_items })

        if (error) {
          console.error('Error inserting new WR:', error);
          throw error;
        } else {
          console.log('WR inserted successfully:', data);
        }

        navigate("/order/status", {
          state: { wr_data, wr_items },
          replace: true,
        });

      } catch (error) {
        console.error("Error submitting WR :", error);
      }


      
      

    };
  
    return (
      <div className="p-6 bg-gray-50 rounded-lg shadow-md space-y-4">
        <h2 className="text-xl font-bold">Cart Summary</h2>
        <div className="destination flex justify-between">
          <h1>Drop Point</h1>
          <ComboboxWithFilter
            choices={[
            ]}
            onSelect={(selectedValue) => {
              setDropPoint(selectedValue);
            }}
          />
        </div>
        <div className="destination flex justify-between">
          <h1>Receiver</h1>
          <ComboboxWithFilter
            choices={[]}
            onSelect={(selectedValue) => {
              setReceiver(selectedValue);
            }}
          />
        </div>
        <div className="schedule flex justify-between">
          <h1>Schedule</h1>
          <ComboboxWithFilter
            choices={hours}
            onSelect={(selectedValue) => {
              setSchedule(parseInt(selectedValue));
            }}
          />
        </div>
        <Separator />
        <div className="schedule flex flex-cols-3 justify-between">
          <h1>Ordered By</h1>
          <h1>{orderedBy}</h1>
        </div>
        

        <div className="proceed_checkout mt-10">
        {errorMessage && <h1 className="text-red-700 py-4">{errorMessage}</h1> }
        {approvalMessage && <h1 className="text-orange-500 py-4">{approvalMessage}</h1> }
        
        <ReusableAlertDialog
        valid={validation}
        triggerText="Proceed to Checkout"
        title="Proceed to Checkout"
        description="Are you sure you want to proceed to checkout?"
        onAction={handleProceedCheckout}
        actionText="Proceed"
        cancelText="Cancel"
        ></ReusableAlertDialog>
        </div>
  
        
      </div>
    );
  
  
  
  };

  export default CartSummary;