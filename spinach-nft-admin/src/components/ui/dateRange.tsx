"use client";

import {useState, useCallback} from "react";

import {Button} from "@/components/ui/button";

export type DateRangePreset = "today" | "7days" | "30days" | "custom";

export type DateRangeValue = {
  startDate: string; // YYYY-MM-DD format
  endDate: string;   // YYYY-MM-DD format
};

type DateRangePickerProps = {
  value: DateRangeValue;
  onChange: (value: DateRangeValue) => void;
};

const formatDateToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const DateRangePicker = ({value, onChange}: DateRangePickerProps) => {
  const [activePreset, setActivePreset] = useState<DateRangePreset>("custom");

  const applyPreset = useCallback((preset: DateRangePreset) => {
    const now = new Date();
    const today = formatDateToYYYYMMDD(now);

    let startDate: string;
    const endDate = today;

    switch (preset) {
      case "today":
        startDate = today;
        break;
      case "7days": {
        const date7DaysAgo = new Date(now);
        date7DaysAgo.setDate(date7DaysAgo.getDate() - 6);
        startDate = formatDateToYYYYMMDD(date7DaysAgo);
        break;
      }
      case "30days": {
        const date30DaysAgo = new Date(now);
        date30DaysAgo.setDate(date30DaysAgo.getDate() - 29);
        startDate = formatDateToYYYYMMDD(date30DaysAgo);
        break;
      }
      default:
        return;
    }

    setActivePreset(preset);
    onChange({startDate, endDate});
  }, [onChange]);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActivePreset("custom");
    onChange({...value, startDate: e.target.value});
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActivePreset("custom");
    onChange({...value, endDate: e.target.value});
  };

  return (
    <div className="space-y-3">
      {/* Preset buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activePreset === "today" ? "default" : "outline"}
          size="sm"
          onClick={() => applyPreset("today")}
          type="button"
        >
          今天
        </Button>
        <Button
          variant={activePreset === "7days" ? "default" : "outline"}
          size="sm"
          onClick={() => applyPreset("7days")}
          type="button"
        >
          過去 7 天
        </Button>
        <Button
          variant={activePreset === "30days" ? "default" : "outline"}
          size="sm"
          onClick={() => applyPreset("30days")}
          type="button"
        >
          過去 30 天
        </Button>
      </div>

      {/* Date inputs */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label htmlFor="startDate" className="text-sm text-muted-foreground">
            開始日期
          </label>
          <input
            id="startDate"
            type="date"
            value={value.startDate}
            onChange={handleStartDateChange}
            className="rounded-md border border-input bg-background px-3 py-1.5 text-sm text-foreground"
          />
        </div>
        <span className="text-muted-foreground">至</span>
        <div className="flex items-center gap-2">
          <label htmlFor="endDate" className="text-sm text-muted-foreground">
            結束日期
          </label>
          <input
            id="endDate"
            type="date"
            value={value.endDate}
            onChange={handleEndDateChange}
            className="rounded-md border border-input bg-background px-3 py-1.5 text-sm text-foreground"
          />
        </div>
      </div>
    </div>
  );
}
