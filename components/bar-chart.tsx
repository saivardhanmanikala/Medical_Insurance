"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface ChartData {
  name: string
  value: number
}

interface BarChartProps {
  data: ChartData[]
}

export function BarChart({ data }: BarChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map((item) => item.name),
        datasets: [
          {
            label: "Premium Amount (₹)",
            data: data.map((item) => item.value),
            backgroundColor: [
              "hsl(var(--primary) / 0.8)",
              "hsl(var(--muted-foreground) / 0.6)",
              "hsl(var(--success) / 0.6)",
              "hsl(var(--destructive) / 0.6)",
            ],
            borderColor: [
              "hsl(var(--primary))",
              "hsl(var(--muted-foreground))",
              "hsl(var(--success))",
              "hsl(var(--destructive))",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => "₹" + value.toLocaleString(),
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => "₹" + context.parsed.y.toLocaleString(),
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data])

  return <canvas ref={chartRef} />
}

