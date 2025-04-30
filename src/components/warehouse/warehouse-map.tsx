"use client";

import { useQuery } from "@tanstack/react-query";
import { db } from "@/lib/db";
import { useMemo } from "react";

interface WarehouseLayout {
  id: string;
  name: string;
  coordinates: string;
  type: "SHELF" | "AISLE" | "ENTRY" | "EXIT";
  capacity: number;
  currentLoad: number;
}

export function WarehouseMap() {
  const { data: layout, isLoading } = useQuery({
    queryKey: ["warehouseLayout"],
    queryFn: async () => {
      const result = await db.query.warehouseLayout.findMany();
      return result;
    },
  });

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const result = await db.query.products.findMany();
      return result;
    },
  });

  const layoutWithProducts = useMemo(() => {
    if (!layout || !products) return [];
    return layout.map((item) => {
      const coordinates = JSON.parse(item.coordinates);
      const productsInLocation = products.filter(
        (product) => product.location === item.id
      );
      return {
        ...item,
        coordinates,
        products: productsInLocation,
      };
    });
  }, [layout, products]);

  if (isLoading) {
    return <div>Loading warehouse layout...</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Warehouse Layout</h1>
      <div className="relative w-full h-[600px] border rounded-lg overflow-hidden">
        {layoutWithProducts.map((item) => {
          const { x, y } = item.coordinates;
          const color = {
            SHELF: "bg-blue-500",
            AISLE: "bg-gray-300",
            ENTRY: "bg-green-500",
            EXIT: "bg-red-500",
          }[item.type];

          return (
            <div
              key={item.id}
              className={`absolute ${color} rounded-md p-2 text-white text-sm`}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="font-bold">{item.name}</div>
              {item.type === "SHELF" && (
                <div className="text-xs">
                  {item.products.length} / {item.capacity} items
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span>Shelf</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
          <span>Aisle</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Entry</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>Exit</span>
        </div>
      </div>
    </div>
  );
} 