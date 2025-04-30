"use client";

import { useQuery } from "@tanstack/react-query";
import { db } from "@/lib/db";
import { inventoryMovements } from "@/lib/schema";

interface Transaction {
  id: string;
  productId: string;
  type: "IN" | "OUT" | "TRANSFER";
  quantity: number;
  fromLocation: string | null;
  toLocation: string;
  timestamp: string | null;
}

export function Transactions() {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const result = await db.select().from(inventoryMovements);
      return result as Transaction[];
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Transaction History</h1>
      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Quantity</th>
              <th className="p-4 text-left">From</th>
              <th className="p-4 text-left">To</th>
              <th className="p-4 text-left">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((transaction: Transaction) => (
              <tr key={transaction.id} className="border-b">
                <td className="p-4">{transaction.productId}</td>
                <td className="p-4">{transaction.type}</td>
                <td className="p-4">{transaction.quantity}</td>
                <td className="p-4">{transaction.fromLocation || "-"}</td>
                <td className="p-4">{transaction.toLocation}</td>
                <td className="p-4">{transaction.timestamp || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 