import {formatNumber} from "@spinach/common/utils/number";

import {NftExchangeReportItem} from "@/types/report";


type ReportListProps = {
  items: NftExchangeReportItem[],
};

const formatDateTime = (epochMs: number): string => {
  return new Date(epochMs).toLocaleString("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};


export const ReportList = ({items}: ReportListProps) => {
  if (items.length === 0) {
    return (
      <div className={`
        rounded-lg border border-border bg-card p-8 text-center
        text-muted-foreground
      `}>
        所選期間內無交易記錄
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full">
        <thead className="bg-muted/50">
          <tr>
            <th className={`
              px-4 py-3 text-left text-sm font-medium text-muted-foreground
            `}>
              時間
            </th>
            <th className={`
              px-4 py-3 text-left text-sm font-medium text-muted-foreground
            `}>
              請求 UUID
            </th>
            <th className={`
              px-4 py-3 text-left text-sm font-medium text-muted-foreground
            `}>
              Token
            </th>
            <th className={`
              px-4 py-3 text-right text-sm font-medium text-muted-foreground
            `}>
              請求金額
            </th>
            <th className={`
              px-4 py-3 text-right text-sm font-medium text-muted-foreground
            `}>
              匹配金額
            </th>
            <th className={`
              px-4 py-3 text-right text-sm font-medium text-muted-foreground
            `}>
              退款
            </th>
            <th className={`
              px-4 py-3 text-center text-sm font-medium text-muted-foreground
            `}>
              狀態
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {items.map((item) => (
            <tr key={item.requestUuid} className={`
              bg-card
              hover:bg-muted/30
            `}>
              <td className={`
                px-4 py-3 text-sm whitespace-nowrap text-foreground
              `}>
                {formatDateTime(item.matchedAtEpochMs)}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                <span className="block max-w-[120px] truncate" title={item.requestUuid}>
                  {item.requestUuid}
                </span>
              </td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                <span className="block max-w-[80px] truncate" title={item.token}>
                  {item.token}
                </span>
              </td>
              <td className={`
                px-4 py-3 text-right text-sm whitespace-nowrap text-foreground
              `}>
                {formatNumber(item.amount.requested)}
              </td>
              <td className={`
                px-4 py-3 text-right text-sm whitespace-nowrap text-foreground
              `}>
                {formatNumber(item.amount.matched)}
              </td>
              <td className={`
                px-4 py-3 text-right text-sm whitespace-nowrap text-foreground
              `}>
                {formatNumber(item.amount.refunded)}
              </td>
              <td className="px-4 py-3 text-center whitespace-nowrap">
                {item.completedAtEpochMs !== null ? (
                  <span className={`
                    inline-flex items-center rounded-full bg-green-900/30 px-2
                    py-1 text-xs text-green-400
                  `}>
                    已完成
                  </span>
                ) : (
                  <span className={`
                    inline-flex items-center rounded-full bg-yellow-900/30 px-2
                    py-1 text-xs text-yellow-400
                  `}>
                    待處理
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
