import CurrencyInput, {
  CurrencyInputOnChangeValues,
} from "react-currency-input-field";
import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
type Props = {
  id?: string | undefined;
  defaultValue?: string | number | undefined;
  value?: string | number | readonly string[] | undefined;
  onValueChange?: (
    value: string | undefined,
    name?: string,
    values?: CurrencyInputOnChangeValues
  ) => void;
  placeholder?: string | undefined;
  disabled?: boolean;
  className?: string; 
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

export const AmountInput = ({
  id,
  defaultValue,
  value,
  onValueChange,
  placeholder,
  disabled,
  Icon,
}: Props) => {
  return (
    <div id={id} className="relative">
      <button
        id={id}
        type="button"
        className={cn(
          " bg-emerald-500 hover:bg-emerald-500 absolute top-1.5 left-1.5 rounded-sm p-1 flex items-center justify-center transition"
        )}
      >
        <Icon className="w-5 h-5 text-white" />
      </button>
      <CurrencyInput
        id={id}
        className="pl-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        decimalsLimit={2}
        decimalScale={2}
        onValueChange={onValueChange}
        disabled={disabled}
        allowDecimals={true}
        maxLength={8}
        inputMode="text"
      />
    </div>
  );
};
