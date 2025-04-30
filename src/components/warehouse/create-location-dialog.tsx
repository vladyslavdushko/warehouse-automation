"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WarehouseZone } from "@/lib/db/schema";

interface CreateLocationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  zones: WarehouseZone[];
}

export function CreateLocationDialog({ open, onOpenChange, zones }: CreateLocationDialogProps) {
  const [zoneId, setZoneId] = useState("");
  const [name, setName] = useState("");
  const [row, setRow] = useState("");
  const [column, setColumn] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const queryClient = useQueryClient();

  const { mutate: createLocation, isPending } = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          zone_id: parseInt(zoneId),
          name,
          row: parseInt(row),
          column: parseInt(column),
          max_capacity: parseInt(maxCapacity),
        }),
      });
      if (!response.ok) throw new Error("Failed to create location");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      onOpenChange(false);
      setZoneId("");
      setName("");
      setRow("");
      setColumn("");
      setMaxCapacity("");
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Location</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="zone">Zone</Label>
            <Select value={zoneId} onValueChange={setZoneId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a zone" />
              </SelectTrigger>
              <SelectContent>
                {zones.map((zone) => (
                  <SelectItem key={zone.id} value={zone.id.toString()}>
                    {zone.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Location Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter location name"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="row">Row</Label>
              <Input
                id="row"
                type="number"
                value={row}
                onChange={(e) => setRow(e.target.value)}
                placeholder="Enter row number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="column">Column</Label>
              <Input
                id="column"
                type="number"
                value={column}
                onChange={(e) => setColumn(e.target.value)}
                placeholder="Enter column number"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxCapacity">Maximum Capacity</Label>
            <Input
              id="maxCapacity"
              type="number"
              value={maxCapacity}
              onChange={(e) => setMaxCapacity(e.target.value)}
              placeholder="Enter maximum capacity"
            />
          </div>
          <Button
            onClick={() => createLocation()}
            disabled={!zoneId || !name || !row || !column || !maxCapacity || isPending}
            className="w-full"
          >
            {isPending ? "Creating..." : "Create Location"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 