import clsx from "clsx";

import {TokenFeeConfig} from "@/types/admin";


type TokenFeeInputProps = {
  value: TokenFeeConfig,
  onChange: (value: TokenFeeConfig) => void,
};

export function TokenFeeInput({value, onChange}: TokenFeeInputProps) {
  const handleChange = (type: "inflow" | "outflow", field: "rate" | "flat", val: string) => {
    const numVal = parseFloat(val);
    onChange({
      ...value,
      [type]: {
        ...value[type],
        [field]: isNaN(numVal) ? 0 : numVal,
      },
    });
  };

  const inputClassName = clsx(
    "flex h-9 w-full rounded-md border border-input bg-transparent",
    "px-3 py-1 text-sm shadow-sm transition-colors",
    "placeholder:text-muted-foreground",
    "focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none",
  );

  return (
    <div className="rounded-md border border-border p-4">
      <h3 className="mb-3 text-sm font-medium">手續費設定</h3>
      <div className={`
        grid grid-cols-1 gap-6
        md:grid-cols-2
      `}>
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">轉入 (充值)</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="mb-1 block text-xs text-muted-foreground">固定</span>
              <input
                type="number"
                step="0.01"
                value={value.inflow.flat}
                onChange={(e) => handleChange("inflow", "flat", e.target.value)}
                className={inputClassName}
                placeholder="0"
              />
            </div>
            <div>
              <span className="mb-1 block text-xs text-muted-foreground">比率 (%)</span>
              <input
                type="number"
                step="0.01"
                value={value.inflow.rate}
                onChange={(e) => handleChange("inflow", "rate", e.target.value)}
                className={inputClassName}
                placeholder="0"
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">轉出 (提現)</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="mb-1 block text-xs text-muted-foreground">固定</span>
              <input
                type="number"
                step="0.01"
                value={value.outflow.flat}
                onChange={(e) => handleChange("outflow", "flat", e.target.value)}
                className={inputClassName}
                placeholder="0"
              />
            </div>
            <div>
              <span className="mb-1 block text-xs text-muted-foreground">比率 (%)</span>
              <input
                type="number"
                step="0.01"
                value={value.outflow.rate}
                onChange={(e) => handleChange("outflow", "rate", e.target.value)}
                className={inputClassName}
                placeholder="0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
