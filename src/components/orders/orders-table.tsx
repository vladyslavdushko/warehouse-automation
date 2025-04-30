import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Order {
  id: number;
  customer: string;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED";
  total_amount: number;
  created_at: string;
}

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Order["status"];
      const variant = {
        PENDING: "secondary" as const,
        PROCESSING: "warning" as const,
        COMPLETED: "success" as const,
        CANCELLED: "destructive" as const,
      }[status];
      
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: "total_amount",
    header: "Total Amount",
    cell: ({ row }) => {
      const amount = row.getValue("total_amount") as number;
      return `$${amount.toFixed(2)}`;
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
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