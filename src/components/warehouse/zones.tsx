import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WarehouseZone } from "@/lib/db/schema";

interface WarehouseZonesProps {
  zones: WarehouseZone[];
}

export function WarehouseZones({ zones }: WarehouseZonesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Warehouse Zones</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {zones.map((zone) => (
            <div
              key={zone.id}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold">{zone.name}</h3>
              {zone.description && (
                <p className="text-sm text-gray-500 mt-1">{zone.description}</p>
              )}
            </div>
          ))}
          {zones.length === 0 && (
            <p className="text-sm text-gray-500 text-center">
              No zones created yet
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 