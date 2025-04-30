"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDatabase } from "@/hooks/useDatabase";
import { STORE_NAMES } from "@/lib/db/schema";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddProductDialog({ open, onOpenChange }: AddProductDialogProps) {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reorderThreshold, setReorderThreshold] = useState("");
  const [location, setLocation] = useState("");
  const queryClient = useQueryClient();
  const { db } = useDatabase();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;

    try {
      await db.add(STORE_NAMES.PRODUCTS, {
        id: crypto.randomUUID(),
        sku,
        name,
        quantity: parseInt(quantity),
        reorderThreshold: parseInt(reorderThreshold),
        location,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      queryClient.invalidateQueries({ queryKey: ["products"] });
      onOpenChange(false);
      resetForm();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const resetForm = () => {
    setName("");
    setSku("");
    setQuantity("");
    setReorderThreshold("");
    setLocation("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="reorderThreshold">Reorder Threshold</Label>
              <Input
                id="reorderThreshold"
                type="number"
                value={reorderThreshold}
                onChange={(e) => setReorderThreshold(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button type="submit">Add Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 