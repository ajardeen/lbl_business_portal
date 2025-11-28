import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const VA_AreaChart = ({
  datasets = {
    week: [],
    month: [],
    year: [],
  },
  chartConfig = {
    count: { label: "Leads", color: "#2563EB" },
  },
  title = "Leads Overview",
  description = "Lead growth trend based on selected time range",
}) => {
  const [timeRange, setTimeRange] = React.useState("week");
  const chartData = datasets[timeRange] || [];

  const dropdownOptions = [
    { label: "Last 7 Days", value: "week" },
    { label: "Last 30 Days", value: "month" },
    { label: "This Year", value: "year" },
  ];

  return (
    <Card className="pt-0 !bg-transparent">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>

        {/* Dropdown */}
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select Time Range"
          >
            <SelectValue placeholder="Select Range" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {dropdownOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 !bg-transparent">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillCount" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartConfig.count.color}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={chartConfig.count.color}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const d = new Date(value);
                if (timeRange === "year")
                  return d.toLocaleDateString("en-US", { month: "short" });
                if (timeRange === "month")
                  return d.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                return d.toLocaleDateString("en-US", { weekday: "short" });
              }}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />

            <Area
              dataKey="count"
              type="natural"
              fill="url(#fillCount)"
              stroke={chartConfig.count.color}
              strokeWidth={2}
              stackId="a"
              isAnimationActive={true}
              animationDuration={500}
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default VA_AreaChart;
