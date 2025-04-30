import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Welcome to your warehouse management system</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/warehouse">
          <Card className="hover:bg-gray-50 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Warehouse Layout</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">View Layout</div>
              <p className="text-xs text-gray-500">Manage warehouse zones and locations</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/products">
          <Card className="hover:bg-gray-50 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Manage Products</div>
              <p className="text-xs text-gray-500">View and manage inventory</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/orders">
          <Card className="hover:bg-gray-50 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Manage Orders</div>
              <p className="text-xs text-gray-500">Process and track orders</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/reports">
          <Card className="hover:bg-gray-50 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">View Reports</div>
              <p className="text-xs text-gray-500">Generate and view reports</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
} 