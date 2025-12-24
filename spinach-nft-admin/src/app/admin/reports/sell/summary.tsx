import {formatNumber} from "@spinach/common/utils/number";
import {NftSellReportSummary} from "@/types/report";

type SellReportSummaryProps = {
  summary: NftSellReportSummary;
};

export const SellReportSummary = ({summary}: SellReportSummaryProps) => {

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="text-sm text-muted-foreground">總請求次數</div>
        <div className="mt-1 text-2xl font-semibold text-foreground">
          {formatNumber(summary.totalCount)}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <div className="text-sm text-muted-foreground">總上架金額</div>
        <div className="mt-1 text-2xl font-semibold text-foreground">
          {formatNumber(summary.totalAmount)}
        </div>
      </div>
    </div>
  );
}
