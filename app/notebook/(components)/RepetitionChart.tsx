import {
  BarChartIcon,
  BarRoundChartIcon,
  InfoCircle,
  Panda1Icon
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, XAxis } from "recharts";

export function RepetitionChart() {
  const chartData = [
    { month: "1", desktop: 186 },
    { month: "2", desktop: 305 },
    { month: "3", desktop: 237 },
    { month: "4", desktop: 73 },
    { month: "Nhớ sâu", desktop: 209 },
  ];
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "var(--surface-brand-primary)",
    },
  } satisfies ChartConfig;
  return (
    <Card className="ring-0 p-4 gap-2">
      <div className="flex items-center justify-between">
        <div className="text-xl font-extrabold">
          Spaced Repetition <InfoCircle className="inline-block w-5 h-5" />
        </div>
        <ButtonGroup>
          <Button variant="secondary">
            <BarChartIcon />
          </Button>
          <Button className="bg-(--surface-brand-primary)">
            <BarRoundChartIcon />
          </Button>
        </ButtonGroup>
      </div>
      <ChartContainer config={chartConfig} className="min-h-50 w-full">
        <BarChart accessibilityLayer data={chartData}>
          <XAxis dataKey="month" />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} maxBarSize={40} />
        </BarChart>
      </ChartContainer>
      <div className="h-11 px-3 text-(--text-white) rounded-[16px] flex items-center justify-between bg-[linear-gradient(90deg,#595959_-7.23%,#595959_53.77%,#e5e5e5_103.68%)]">
        <span className="flex items-center text-base">Ôn tập ngay <span className="text-2xl font-semibold inline-block mx-2">0</span> Từ</span> <Panda1Icon />
      </div>
    </Card>
  );
}
