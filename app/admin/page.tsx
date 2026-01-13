import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-2 md:py-2">
      <SectionCards />
      <div className="px-4 lg:px-2">
        <ChartAreaInteractive />
      </div>
    </div>
  );
}
