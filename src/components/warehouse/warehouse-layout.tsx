"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WarehouseLocation } from "@/lib/db/schema";
import { cn } from "@/lib/utils";

interface WarehouseLayoutProps {
  locations: (WarehouseLocation & { zone_name: string })[];
}

export function WarehouseLayout({ locations = [] }: WarehouseLayoutProps) {
  // Find the maximum row and column to determine grid size
  const maxRow = Math.max(...locations.map((loc) => loc.row), 0);
  const maxColumn = Math.max(...locations.map((loc) => loc.column), 0);

  // Create a 2D array to represent the warehouse layout
  const grid = Array(maxRow + 1)
    .fill(null)
    .map(() => Array(maxColumn + 1).fill(null));

  // Fill the grid with location data
  locations.forEach((location) => {
    grid[location.row - 1][location.column - 1] = location;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Warehouse Layout</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <div className="inline-block">
            <div className="grid gap-1">
              {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-1">
                  {row.map((location, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={cn(
                        "w-24 h-24 border rounded flex flex-col items-center justify-center p-2 text-center",
                        location
                          ? "bg-blue-50 hover:bg-blue-100 cursor-pointer"
                          : "bg-gray-100"
                      )}
                      title={
                        location
                          ? `${location.name}\nZone: ${location.zone_name}\nCapacity: ${location.current_capacity}/${location.max_capacity}`
                          : "Empty space"
                      }
                    >
                      {location && (
                        <>
                          <span className="text-sm font-medium">
                            {location.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {location.zone_name}
                          </span>
                          <span className="text-xs">
                            {location.current_capacity}/{location.max_capacity}
                          </span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 