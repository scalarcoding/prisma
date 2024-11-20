import { Button } from "@/components/ui/button";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DistributionStatus } from "@/model/distributionStatus";
import React, { useState } from "react";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

interface BasicTableProps {
  data: DistributionStatus[];
  rowsPerPage?: number;
}

const BasicTable: React.FC<BasicTableProps> = ({
  data,
  rowsPerPage = 5,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the current page data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Handle pagination
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="min-w-full bg-white border">
        <TableHeader>
          <TableRow className="border-b-0 bg-slate-200 hover:bg-slate-200">
            <TableHead className="px-4 py-2 text-left text-gray-600">District</TableHead>
            <TableHead className="px-4 py-2 text-left text-gray-600">Avb</TableHead>
            <TableHead className="px-4 py-2 text-left text-gray-600">Own<br></br>SOH</TableHead>
            <TableHead className="px-4 py-2 text-left text-gray-600">Cons<br></br>SOH</TableHead>
            <TableHead className="px-4 py-2 text-left text-gray-600">Total<br></br>SOH</TableHead>
            <TableHead className="px-4 py-2 text-left text-gray-600">In<br></br>Transit</TableHead>
            <TableHead className="px-4 py-2 text-left text-gray-600">Total<br></br>Assets</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentRows.map((status, index) => (
            <TableRow key={index} className="border-b hover:bg-gray-50">
              <TableCell className="px-4 py-2">{status.district_code}</TableCell>
              <TableCell className="px-4 py-2">{status.available}</TableCell>
              <TableCell className="px-4 py-2">{status.owned_soh}</TableCell>
              <TableCell className="px-4 py-2">{status.consigned_soh}</TableCell>
              <TableCell className="px-4 py-2">{status.total_soh}</TableCell>
              <TableCell className="px-4 py-2">{status.in_transit}</TableCell>
              <TableCell className="px-4 py-2">{status.total_assets}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-0">
        <Button variant="ghost" onClick={handlePreviousPage} disabled={currentPage === 1}>
          <TbChevronLeft/>
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button variant="ghost" onClick={handleNextPage} disabled={currentPage === totalPages}>
          <TbChevronRight/>
        </Button>
      </div>
    </div>
  );
};

export default BasicTable;
