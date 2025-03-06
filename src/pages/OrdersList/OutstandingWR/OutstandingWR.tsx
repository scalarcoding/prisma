import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import { TbDotsVertical } from "react-icons/tb";
import { WRActionType } from "./atomic/OutsWRActionType";
import { PopoverClose } from "@radix-ui/react-popover";

import { ReusablePopover } from "@/pages/ProductsDetail/atomic/tabs/ReusablePopover";
import { supabase } from "@/api/repository/supabase";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { hours } from "@/pages/Cart/deliverySchedule";
// import { useNavigate } from "react-router-dom";
// Utility function to generate status chip based on the status
const getStatusChip = (status: string) => {
  const statusStyles: { [key: string]: string } = {
    Pending: "bg-yellow-200 text-yellow-800",
    Progress: "bg-orange-200 text-orange-800",
    Completed: "bg-green-200 text-green-800",
    Rejected: "bg-red-200 text-red-800",
  };

  const className = `inline-block px-2 py-1 rounded-full text-xs font-semibold ${
    statusStyles[status] || "bg-gray-200 text-gray-800"
  }`;
  return <span className={className}>{status}</span>;
};

// // Generate dummy data for the table
// const generateData = (length: number) => {
//   const statuses = ["Pending", "Progress", "Rejected", "Completed"];

//   return Array.from({ length }, (_, i) => ({
//     id: i + 1,
//     requisitionId: `WR-${i + 1}`,
//     item: `${i + 1} item(s)`,
//     quantity: `$${Math.floor(Math.random() * 100) + 1}`,
//     requestedBy: `User ${i + 1}`,
//     createdAt: `2024-11-${(i % 30) + 1}`,
//     status: statuses[i % statuses.length],
//   }));
// };

export interface WarehouseRequisition {
  id: number; // Unique identifier for the WR
  wr_number: string; // WR number
  ordered_by_id: string; // ID of the person who ordered
  receiver_id: string; // ID of the receiver
  created_at: string; // Timestamp when the WR was created
  status: string;
  items_count: number;
  drop_point: string;
  delivery_schedule: string;
  approved_at: string;
}

const OutstandingWRTab: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [data,setData] = useState<WarehouseRequisition[]>([]);
  const [filteredData, setFilteredData] = useState<WarehouseRequisition[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();

  // const navigate = useNavigate();

  // Permissions
  const approvability = false; // Can approve or reject
  const postability = false; // Can post
  const createability = true; // Can create or modify WR

  useEffect(() => {
    const getWarehouseRequistions = async () => {
      const { data, error } = await supabase.rpc("get_warehouse_requisitions", { p_district: user?.lastActiveDistrict });

      if (error) {
        console.error(error);
        toast({
          title: "Lock Token Still Exists",
          variant: "destructive",
          description: error.message,
        });
        return;
      }

      console.log(data);
      

      const whdata = data as WarehouseRequisition[];
      whdata.forEach((item)=>{
        item.status = convertStatus(item.status);
      })

      setData(whdata)
      setFilteredData(whdata)
      setIsLoading(false)
      

    };

    getWarehouseRequistions();
  }, [toast, user?.lastActiveDistrict]);

  // Handle search input
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.trim(); // Trim to avoid unnecessary spaces
    setSearchQuery(query);

    if (query) {
      setIsLoading(true);
      setFilteredData(
        data.filter((row) =>
          row.wr_number.toLowerCase().includes(query.toLowerCase())
        )
      );
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } else {
      // Skip the timeout when clearing the input
      setIsLoading(false);
      setFilteredData(data);
    }
  };

  // Handle checkbox toggle
  const handleCheckboxChange = (id: number) => {
    setSelectedRows((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      return newSelection;
    });
  };

  const convertStatus = (status:string)=>{
    if(status=='approved') return "Progress";
    if(status=='completed') return "Completed";
    if(status=='rejected') return "Rejected";
    return "Pending"

  }

  // Determine available actions for each row
  const getActions = (status: string) => {
    const actions: WRActionType[] = [
      {
        label: "Details",
        handler: () => {
          console.log("Details");
        },
      },
    ];

    if (status === "Pending" && approvability) {
      actions.push({ label: "Approve", handler: () => console.log("Approve") });
      actions.push({ label: "Reject", handler: () => console.log("Reject") });
    }

    if (status === "Progress" && postability) {
      actions.push({ label: "Issue", handler: () => console.log("Issue") });
    }

    if (status === "Completed") {
      actions.push({
        label: "Delivery Slip",
        handler: () => console.log("Delivery Slip"),
      });
    }

    if (status === "Rejected" && createability) {
      actions.push(
        {
          label: "Resolve",
          handler: () => console.log("Resolve"),
        },
        {
          label: "Archive",
          handler: () => console.log("Archive"),
        }
      );
    }

    if (status === "Completed" && createability) {
      actions.push({
        label: "Credit Return",
        handler: () => console.log("Credit Return"),
      });
    }

    if (status === "Pending" && createability) {
      actions.push({
        label: "Modify",
        handler: () => console.log("Modify"),
      });
    }

    return actions;
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Outstanding Warehouse Requisition (WR)
      </h2>
      <input
        type="text"
        placeholder="Search by WR number..."
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
        value={searchQuery}
        onChange={handleSearch}
      />
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="w-full h-6 mb-4" />
          <Skeleton className="w-full h-6 mb-4" />
          <Skeleton className="w-full h-6 mb-4" />
        </div>
      ) : (
        <div className="overflow-scroll">
          <div className="max-h-96">
            <Table className="w-full text-sm">
              <TableHeader className="sticky top-0 bg-slate-200 z-10">
                <TableRow>
                  <TableHead>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        const newSelection = new Set<number>();
                        if (e.target.checked) {
                          filteredData.forEach((row) =>
                            newSelection.add(row.id)
                          );
                        }
                        setSelectedRows(newSelection);
                      }}
                      checked={selectedRows.size === filteredData.length}
                    />
                  </TableHead>
                  <TableHead>Requisition ID</TableHead>
                  <TableHead>Requested By</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Deliver To</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="px-4 bg-slate-50">
                {filteredData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedRows.has(row.id)}
                        onChange={() => handleCheckboxChange(row.id)}
                      />
                    </TableCell>
                    <TableCell>{row.wr_number}</TableCell>
                    <TableCell>{row.ordered_by_id}</TableCell>
                    <TableCell>{row.receiver_id}</TableCell>
                    <TableCell>{row.drop_point}</TableCell>
                    <TableCell>{hours.find((item)=> Number(item.val) === Number(row.delivery_schedule))?.label}</TableCell>
                    <TableCell className="text-center">
                      {getStatusChip(row.status)}
                    </TableCell>
                    <TableCell>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="p-2 text-gray-500 bg-gray-200 hover:bg-gray-300 rounded-full">
                            <TbDotsVertical size={20} />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="bg-white border shadow-lg rounded-md p-2 min-w-[150px]">
                          {getActions(row.status).map((action, i) => (
                            <PopoverClose
                              key={i}
                              className="flex flex-col w-full"
                            >
                              <ReusablePopover
                                trigger={
                                  <Button
                                    onClick={action.handler}
                                    variant="ghost"
                                    className="w-full text-left text-sm py-1"
                                  >
                                    {action.label}
                                  </Button>
                                }
                                title="title"
                                content={<div></div>}
                              ></ReusablePopover>
                            </PopoverClose>
                          ))}
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutstandingWRTab;
