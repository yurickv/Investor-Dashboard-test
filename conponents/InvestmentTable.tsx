"use client";

import { useState } from "react";
import { useTransition } from "react";
import { toast } from "react-hot-toast";

type Investment = {
  id: string;
  project_name: string;
  token_class: string;
  shares_owned: number;
  market_value: number;
  roi_percent: number;
  next_distribution_date: string;
};

type SortKey = "roi_percent" | "next_distribution_date" | null;
type SortDirection = "asc" | "desc";

export default function InvestmentTable({ data }: { data: Investment[] }) {
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [isPending, startTransition] = useTransition();

  const simulatePayout = async (inv: Investment) => {
    console.log("Sending investment", inv);
    startTransition(async () => {
      const res = await fetch("/api/simulate-payout", {
        method: "POST",
        body: JSON.stringify(inv),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        toast.error(`Failed to simulate payout. 
          Something went wrong`);
      } else {
        const payoutAmount = inv.market_value * (inv.roi_percent / 100);
        toast.success(`Payout $${payoutAmount} simulated`);
        // optionally: refresh page
        window.location.reload();
      }
    });
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;

    let aValue = a[sortKey];
    let bValue = b[sortKey];

    if (sortKey === "next_distribution_date") {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const renderSortIcon = (key: SortKey) => {
    if (sortKey !== key)
      return <span className='text-sm ml-1 text-gray-400'>⇅</span>;
    return (
      <span className='text-sm ml-1 text-amber-600'>
        {sortDirection === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  return (
    <div className='overflow-x-auto bg-white shadow rounded'>
      <table className='w-full table-auto text-gray-800'>
        <thead className='bg-gray-100 text-sm text-left'>
          <tr>
            <th className='p-3'>Project</th>
            <th className='p-3'>Token Class</th>
            <th className='p-3'>Shares</th>
            <th className='p-3'>Market Value</th>
            <th
              className='p-3 cursor-pointer select-none'
              onClick={() => handleSort("roi_percent")}
            >
              ROI % {renderSortIcon("roi_percent")}
            </th>
            <th
              className='p-3 cursor-pointer select-none'
              onClick={() => handleSort("next_distribution_date")}
            >
              Next Distribution {renderSortIcon("next_distribution_date")}
            </th>
            <th className='p-3'>Action</th>
          </tr>
        </thead>
        <tbody className='text-sm'>
          {sortedData.map((inv) => (
            <tr key={inv.id} className='border-t'>
              <td className='p-3'>{inv.project_name}</td>
              <td className='p-3'>{inv.token_class}</td>
              <td className='p-3'>{inv.shares_owned}</td>
              <td className='p-3'>${inv.market_value}</td>
              <td className='p-3'>{inv.roi_percent}%</td>
              <td className='p-3'>{inv.next_distribution_date}</td>
              <td className='p-3'>
                <button
                  onClick={() => simulatePayout(inv)}
                  className={`text-sm text-white px-3 py-1 rounded w-[85px] ${
                    isPending
                      ? "bg-green-400"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                  disabled={isPending}
                >
                  Payout
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
