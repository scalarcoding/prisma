import { useEffect, useState } from "react";
import OrderConfirmed from "./OrderConfirmed/OrderConfirmed";
import { useLocation } from "react-router-dom";

const OrderStatus: React.FC = () => {
  const location = useLocation();
  const { wr_data, wr_items } = location.state || {};

  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
      console.log("WR Data:", wr_data);
      console.log("WR Items", wr_items);
      setTimeout(() => {
        setIsProcessing(false);
      }, 2000);
  }, []);

  return (
    <>
      {isProcessing ? (
        <div className="flex flex-col items-center justify-center p-6 bg-gray-50">
          <div className="max-w-lg w-full text-center bg-white rounded-lg shadow-md p-6 space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <h1 className="text-2xl font-bold text-gray-800">
                Processing Your Order
              </h1>
              <p className="text-muted-foreground">
                Your order is being processed. This may take a few seconds.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <OrderConfirmed />
      )}
    </>
  );
};

export default OrderStatus;
