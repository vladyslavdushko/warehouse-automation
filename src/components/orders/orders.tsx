"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { OrderTable } from "./order-table";
import { CreateOrderDialog } from "./create-order-dialog";
import { useDatabase } from "@/hooks/useDatabase";
import { STORE_NAMES } from "@/lib/db/schema";

export function Orders() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { db, isLoading: dbLoading } = useDatabase();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!db) return [];
      return await db.getAll(STORE_NAMES.ORDERS);
    },
    enabled: !!db,
  });

  if (dbLoading || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Order
        </Button>
      </div>

      <OrderTable orders={orders || []} />

      <CreateOrderDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
} 