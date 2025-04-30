import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WarehouseLocation } from "@/lib/db/schema";

interface WarehouseLocationsProps {
  locations: (WarehouseLocation & { zone_name: string })[];
}

export function WarehouseLocations({ locations }: WarehouseLocationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Warehouse Locations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {locations.map((location) => (
            <div
              key={location.id}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{location.name}</h3>
                  <p className="text-sm text-gray-500">
                    Zone: {location.zone_name}
                  </p>
                </div>
                <Badge variant="secondary">
                  {location.current_capacity}/{location.max_capacity}
                </Badge>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                <p>Row: {location.row}, Column: {location.column}</p>
              </div>
            </div>
          ))}
          {locations.length === 0 && (
            <p className="text-sm text-gray-500 text-center">
              No locations created yet
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 