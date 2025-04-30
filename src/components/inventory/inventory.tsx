"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProductTable } from "./product-table";
import { AddProductDialog } from "./add-product-dialog";
import { useDatabase } from "@/hooks/useDatabase";
import { STORE_NAMES } from "@/lib/db/schema";

export function Inventory() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { db, isLoading: dbLoading } = useDatabase();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      if (!db) return [];
      return await db.getAll(STORE_NAMES.PRODUCTS);
    },
    enabled: !!db,
  });

  if (dbLoading || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <ProductTable products={products || []} />

      <AddProductDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </div>
  );
} 