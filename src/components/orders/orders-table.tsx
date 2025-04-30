import { ColumnDef } from "@tanstack/react-table";
import { Order } from "@/lib/db/schema";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
  },
  {
    accessorKey: "customerName",
    header: "Customer",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Order["status"];
      const variant = {
        pending: "secondary",
        processing: "warning",
        completed: "success",
        cancelled: "destructive",
      }[status];
      
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => {
      const amount = row.getValue("totalAmount") as number;
      return `$${amount.toFixed(2)}`;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return format(date, "MMM d, yyyy HH:mm");
    },
  },
];

interface OrdersTableProps {
  orders: Order[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
  return <DataTable columns={columns} data={orders} />;
} 