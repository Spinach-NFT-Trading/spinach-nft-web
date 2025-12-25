import {formatNumber} from "@spinach/common/utils/number";

import {NftExchangeReportSummary} from "@/types/report";


type ReportSummaryProps = {
  summary: NftExchangeReportSummary,
};

export const ReportSummary = ({summary}: ReportSummaryProps) => {

  return (
    <div className={`
      grid grid-cols-2 gap-4
      sm:grid-cols-3
      lg:grid-cols-6
    `}>
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="text-sm text-muted-foreground">總交易次數</div>
        <div className="mt-1 text-2xl font-semibold text-foreground">
          {formatNumber(summary.totalCount)}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <div className="text-sm text-muted-foreground">請求總金額</div>
        <div className="mt-1 text-2xl font-semibold text-foreground">
          {formatNumber(summary.totalRequested)}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <div className="text-sm text-muted-foreground">匹配總金額</div>
        <div className="mt-1 text-2xl font-semibold text-foreground">
          {formatNumber(summary.totalMatched)}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <div className="text-sm text-muted-foreground">退款總金額</div>
        <div className="mt-1 text-2xl font-semibold text-foreground">
          {formatNumber(summary.totalRefunded)}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <div className="text-sm text-muted-foreground">已完成</div>
        <div className="mt-1 text-2xl font-semibold text-green-500">
          {formatNumber(summary.completedCount)}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <div className="text-sm text-muted-foreground">待處理</div>
        <div className="mt-1 text-2xl font-semibold text-yellow-500">
          {formatNumber(summary.pendingCount)}
        </div>
      </div>
    </div>
  );
};
