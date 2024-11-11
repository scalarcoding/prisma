"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DropdownMenuCheckboxItem } from "@radix-ui/react-dropdown-menu"

// Updated data structure with more than 10 items for pagination
const data: PartNumberList[] = [
  { id: 1, part_number: "PN-001", img_url: "/images/success.png", preference: "01" },
  { id: 2, part_number: "PN-002", img_url: "/images/success.png", preference: "02" },
  { id: 3, part_number: "PN-003", img_url: "/images/processing.png", preference: "03" },
  { id: 4, part_number: "PN-004", img_url: "/images/success.png", preference: "04" },
  { id: 5, part_number: "PN-005", img_url: "/images/failed.png", preference: "88" },
  { id: 6, part_number: "PN-006", img_url: "/images/failed.png", preference: "05" },
  { id: 7, part_number: "PN-007", img_url: "/images/success.png", preference: "98" },
  { id: 8, part_number: "PN-008", img_url: "/images/processing.png", preference: "02" },
  { id: 9, part_number: "PN-009", img_url: "/images/success.png", preference: "45" },
  { id: 10, part_number: "PN-010", img_url: "/images/success.png", preference: "99" },
  { id: 11, part_number: "PN-011", img_url: "/images/success.png", preference: "01" },
]

export type PartNumberList = {
  id: number
  part_number: string
  img_url: string
  preference: string
}

export const columns: ColumnDef<PartNumberList>[] = [
  {
    id: "select",
    header: ({ table }) => <div>Select</div>,
    cell: ({ row }) => (
      <Checkbox
        checked={row.original.preference === "01"}
        readOnly
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "img_url",
    header: "Image",
    cell: ({ row }) => (
      <img
        src={row.getValue("img_url")}
        alt="Status Icon"
        className="h-6 w-6"
      />
    ),
  },
  {
    accessorKey: "part_number",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Part Number
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("part_number")}</div>,
  },
  {
    accessorKey: "preference",
    header: () => <div className="text-right">Preference</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {row.getValue("preference")}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const partNumber = row.original
      const actions =
        partNumber.preference === "01"
          ? ["View Details"]
          : ["Make Preference", "Delete", "View Details"]

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {actions.map((action, index) => (
              <DropdownMenuItem key={index} onClick={() => console.log(`${action} clicked`)}>
                {action}
              </DropdownMenuItem>
            ))}
            {partNumber.preference !== "01" && <DropdownMenuSeparator />}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function PartNumbersList() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    pageCount: Math.ceil(data.length / 5),
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter part numbers..."
          value={(table.getColumn("part_number")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("part_number")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button variant="default" className="ml-auto">
              New Part Number
            </Button>

      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={row.getIsSelected() ? "bg-gray-200" : ""}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
