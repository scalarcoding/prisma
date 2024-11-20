"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import './CDUChart.css'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An interactive bar chart"

const chartData = [
  { date: "2024-01-01", call: 95, demand: 180, usage: 130 },
  { date: "2024-02-01", call: 105, demand: 205, usage: 145 },
  { date: "2024-03-01", call: 110, demand: 185, usage: 170 },
  { date: "2024-04-01", call: 120, demand: 250, usage: 220 },
  { date: "2024-05-01", call: 125, demand: 230, usage: 200 },
  { date: "2024-06-01", call: 115, demand: 275, usage: 170 },
  { date: "2024-07-01", call: 130, demand: 290, usage: 240 },
  { date: "2024-08-01", call: 135, demand: 320, usage: 270 },
  { date: "2024-09-01", call: 140, demand: 310, usage: 280 },
  { date: "2024-10-01", call: 125, demand: 350, usage: 300 },
  { date: "2024-11-01", call: 150, demand: 330, usage: 290 },
  { date: "2024-12-01", call: 160, demand: 400, usage: 350 }
];


const chartConfig = {
  call: {
    label: "Call",
    color: "hsl(var(--chart-4))",
  },
  demand: {
    label: "Demand",
    color: "hsl(var(--chart-2))",
  },
  usage: {
    label: "Usage",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function CDUChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("call")

  const total = React.useMemo(
    () => ({
      call: chartData.reduce((acc, curr) => acc + curr.call, 0),
      demand: chartData.reduce((acc, curr) => acc + curr.demand, 0),
      usage: chartData.reduce((acc, curr) => acc + curr.usage, 0),
    }),
    []
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-1 sm:py-1">
          <CardTitle>CDU Chart</CardTitle>
          <CardDescription>
            2024
          </CardDescription>
        </div>
        <div className="flex">
          {["call", "demand", "usage"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-1 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-1"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[135px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: undefined,
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: undefined,
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
