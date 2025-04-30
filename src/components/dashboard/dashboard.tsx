"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar/sidebar";
import { Inventory } from "../inventory/inventory";
import { Orders } from "@/components/orders/orders";
import { WarehouseMap } from "@/components/warehouse/warehouse-map";
import { Transactions } from "@/components/transactions/transactions";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("inventory");

  const renderContent = () => {
    switch (activeTab) {
      case "inventory":
        return <Inventory />;
      case "orders":
        return <Orders />;
      case "warehouse":
        return <WarehouseMap />;
      case "transactions":
        return <Transactions />;
      default:
        return <Inventory />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-8 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
} 