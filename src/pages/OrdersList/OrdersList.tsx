import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OutstandingWRTab from "./OutstandingWR/OutstandingWR";
import OutstandingPRTab from "./OutstandingPR/OutstandingPR";
import OutstandingPOTab from "./OutstandingPO/OutstandingPO";

const OrdersList: React.FC = () => {
  return (
    <div className="p-6 bg-white" style={{ minHeight: 'calc(100vh - 60px)' }}>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Orders</h1>

      <Tabs defaultValue="outstandingWR" className="w-full">
        {/* Tabs Navigation */}
        <TabsList className="mb-4">
          <TabsTrigger value="outstandingWR">Outstanding WR</TabsTrigger>
          <TabsTrigger value="outstandingPR">Outstanding PR</TabsTrigger>
          <TabsTrigger value="outstandingPO">Outstanding PO</TabsTrigger>
        </TabsList>

        {/* Outstanding WR Tab */}
        <TabsContent value="outstandingWR">
          <OutstandingWRTab />
        </TabsContent>

        {/* Outstanding PR Tab */}
        <TabsContent value="outstandingPR">
          <OutstandingPRTab />
        </TabsContent>

        {/* Outstanding PO Tab */}
        <TabsContent value="outstandingPO">
          <OutstandingPOTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrdersList;
