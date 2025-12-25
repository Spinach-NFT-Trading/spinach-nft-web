"use client";

import {useEffect, useState} from "react";

import {SellReportList} from "@/app/admin/reports/sell/list";
import {SellReportSummary} from "@/app/admin/reports/sell/summary";
import {Button} from "@/components/ui/button";
import {DateRangePicker, DateRangeValue} from "@/components/ui/dateRange";
import {
  AccountWithTokens,
  getSellReportsAction,
  listAccountsWithTokensAction,
} from "@/controllers/report/action";
import {listUsersAction} from "@/controllers/user/action";
import {NftSellReportBundle} from "@/types/report";


type User = {
  id: string,
  name: string,
  username?: string,
};

const formatDateToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getDefaultDateRange = (): DateRangeValue => {
  const now = new Date();
  const today = formatDateToYYYYMMDD(now);
  const date7DaysAgo = new Date(now);
  date7DaysAgo.setDate(date7DaysAgo.getDate() - 6);
  return {
    startDate: formatDateToYYYYMMDD(date7DaysAgo),
    endDate: today,
  };
};

export const SellReportsClient = () => {
  const [accounts, setAccounts] = useState<AccountWithTokens[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRangeValue>(getDefaultDateRange);
  const [report, setReport] = useState<NftSellReportBundle | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const [accountsData, usersData] = await Promise.all([
          listAccountsWithTokensAction(),
          listUsersAction(),
        ]);
        setAccounts(accountsData);
        if (usersData && "users" in usersData) {
          setUsers(usersData.users as User[]);
        }
        if (accountsData.length > 0) {
          setSelectedAccountId(accountsData[0].accountId);
        }
      } catch (e) {
        setError("載入帳戶資料失敗");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleFetchReports = async () => {
    if (!selectedAccountId) {
      setError("請選擇帳戶");
      return;
    }

    try {
      setFetching(true);
      setError(null);

      // Convert date strings to epoch milliseconds
      // Start of day for startDate, end of day for endDate
      const startEpochMs = new Date(`${dateRange.startDate}T00:00:00`).getTime();
      const endEpochMs = new Date(`${dateRange.endDate}T23:59:59.999`).getTime();

      const result = await getSellReportsAction({
        accountId: selectedAccountId,
        startEpochMs,
        endEpochMs,
      });

      setReport(result);
    } catch (e) {
      setError("載入報表失敗");
      console.error(e);
    } finally {
      setFetching(false);
    }
  };

  const getUserName = (accountId: string): string => {
    const user = users.find((u) => u.id === accountId);
    if (user) {
      return user.name || user.username || accountId;
    }
    return accountId;
  };

  if (loading) {
    return <div className="text-muted-foreground">載入中...</div>;
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className={`
          rounded-md border border-red-800 bg-red-900/20 p-3 text-sm
          text-red-400
        `}>
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="space-y-4 rounded-lg border border-border bg-card p-4">
        <h2 className="text-lg font-semibold text-foreground">查詢條件</h2>

        {/* Account selector */}
        <div className="flex items-center gap-3">
          <label htmlFor="account" className="text-sm text-muted-foreground">
            選擇帳戶
          </label>
          <select
            id="account"
            value={selectedAccountId}
            onChange={(e) => setSelectedAccountId(e.target.value)}
            className={`
              rounded-md border border-input bg-background px-3 py-1.5 text-sm
              text-foreground
            `}
          >
            {accounts.length === 0 ? (
              <option value="">無帳戶資料</option>
            ) : (
              accounts.map((account) => (
                <option key={account.accountId} value={account.accountId}>
                  {getUserName(account.accountId)} ({account.tokenCount} tokens)
                </option>
              ))
            )}
          </select>
        </div>

        {/* Date range picker */}
        <DateRangePicker value={dateRange} onChange={setDateRange}/>

        {/* Fetch button */}
        <div>
          <Button onClick={handleFetchReports} isLoading={fetching} disabled={!selectedAccountId}>
            查詢報表
          </Button>
        </div>
      </div>

      {/* Results */}
      {report && (
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-foreground">報表結果</h2>

          {/* Summary */}
          <SellReportSummary summary={report.summary}/>

          {/* Detail list */}
          <div>
            <h3 className="mb-3 text-base font-medium text-foreground">上架明細</h3>
            <SellReportList items={report.items}/>
          </div>
        </div>
      )}
    </div>
  );
};
