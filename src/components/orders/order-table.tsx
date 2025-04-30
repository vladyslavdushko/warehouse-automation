"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { format } from "date-fns";
import { DataTable } from "@/components/ui/data-table";
import { Order } from "@/lib/db/schema";

interface OrderTableProps {
  orders: Order[];
}

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "customerName",
    header: "Customer",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
];

export function OrderTable({ orders }: OrderTableProps) {
  return <DataTable columns={columns} data={orders} />;
} 