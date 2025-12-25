import {formatNumber} from "@spinach/common/utils/number";

import {NftSellReportItem} from "@/types/report";


type SellReportListProps = {
  items: NftSellReportItem[],
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


export const SellReportList = ({items}: SellReportListProps) => {
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
              NFT ID
            </th>
            <th className={`
              px-4 py-3 text-left text-sm font-medium text-muted-foreground
            `}>
              Token
            </th>
            <th className={`
              px-4 py-3 text-left text-sm font-medium text-muted-foreground
            `}>
              銀行帳號
            </th>
            <th className={`
              px-4 py-3 text-right text-sm font-medium text-muted-foreground
            `}>
              金額
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {items.map((item) => (
            <tr key={item.nftId} className={`
              bg-card
              hover:bg-muted/30
            `}>
              <td className={`
                px-4 py-3 text-sm whitespace-nowrap text-foreground
              `}>
                {formatDateTime(item.createdAtEpochMs)}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                <span className="block max-w-[120px] truncate" title={item.nftId}>
                  {item.nftId}
                </span>
              </td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                <span className="block max-w-[80px] truncate" title={item.token}>
                  {item.token}
                </span>
              </td>
              <td className="px-4 py-3 font-mono text-sm text-foreground">
                {item.bankAccount}
              </td>
              <td className={`
                px-4 py-3 text-right text-sm whitespace-nowrap text-foreground
              `}>
                {formatNumber(item.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
