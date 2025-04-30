"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { WarehouseZones } from "@/components/warehouse/zones";
import { WarehouseLocations } from "@/components/warehouse/locations";
import { WarehouseLayout } from "@/components/warehouse/warehouse-layout";
import { CreateZoneDialog } from "@/components/warehouse/create-zone-dialog";
import { CreateLocationDialog } from "@/components/warehouse/create-location-dialog";

export default function WarehousePage() {
  const [isCreateZoneDialogOpen, setIsCreateZoneDialogOpen] = useState(false);
  const [isCreateLocationDialogOpen, setIsCreateLocationDialogOpen] = useState(false);

  const { data: zones, isLoading: isLoadingZones } = useQuery({
    queryKey: ["zones"],
    queryFn: async () => {
      const response = await fetch("/api/zones");
      if (!response.ok) throw new Error("Failed to fetch zones");
      return response.json();
    },
  });

  const { data: locations, isLoading: isLoadingLocations } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const response = await fetch("/api/locations");
      if (!response.ok) throw new Error("Failed to fetch locations");
      return response.json();
    },
  });

  if (isLoadingZones || isLoadingLocations) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Warehouse Management</h1>
        <div className="space-x-4">
          <Button onClick={() => setIsCreateZoneDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Zone
          </Button>
          <Button onClick={() => setIsCreateLocationDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Location
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <WarehouseLayout locations={locations} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WarehouseZones zones={zones} />
        <WarehouseLocations locations={locations} />
      </div>

      <CreateZoneDialog
        open={isCreateZoneDialogOpen}
        onOpenChange={setIsCreateZoneDialogOpen}
      />
      <CreateLocationDialog
        open={isCreateLocationDialogOpen}
        onOpenChange={setIsCreateLocationDialogOpen}
        zones={zones}
      />
    </div>
  );
} 