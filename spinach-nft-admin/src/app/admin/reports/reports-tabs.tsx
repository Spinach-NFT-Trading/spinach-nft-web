"use client";

import {useState} from "react";

import {ExchangeReportsClient} from "@/app/admin/reports/exchange/client";
import {SellReportsClient} from "@/app/admin/reports/sell/client";
import {Button} from "@/components/ui/button";

type ReportType = "exchange" | "sell";

export const ReportsTabs = () => {
  const [activeTab, setActiveTab] = useState<ReportType>("exchange");

  return (
    <div className="space-y-6">
      <div className="flex gap-4 border-b border-border pb-2">
        <Button
          variant={activeTab === "exchange" ? "default" : "ghost"}
          onClick={() => setActiveTab("exchange")}
          className="relative"
        >
          交換報表
        </Button>
        <Button
          variant={activeTab === "sell" ? "default" : "ghost"}
          onClick={() => setActiveTab("sell")}
          className="relative"
        >
          上架請求
        </Button>
      </div>

      <div className="pt-4">
        {activeTab === "exchange" ? <ExchangeReportsClient /> : <SellReportsClient />}
      </div>
    </div>
  );
}
