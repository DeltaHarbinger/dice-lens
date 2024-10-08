import type { ChartConfiguration } from "chart.js";

export function diceChartData(diceProbability: Record<number, number>): ChartConfiguration {
    const sortedDatapoints = diceChartDatapoints(diceProbability)
    return {
        type: "bar",
        data: {
            labels: sortedDatapoints.map((i) => i.label),
            datasets: [
                {
                    label: "Final Outcome",
                    data: sortedDatapoints.map((i) => i.value),
                    pointRadius: 8,
                    pointHoverRadius: 12,
                    tension: 0.1,
                    fill: true,
                    minBarLength: 4,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    ticks: {
                        callback: function (value) {
                            return value.toLocaleString("en-US", { style: "percent" });
                        },
                    },
                    beginAtZero: true,
                },
            },
            plugins: {
                tooltip: {
                    enabled: true,
                    intersect: false,
                    mode: 'x',
                    callbacks: {
                        label: function (context) {
                            return context.parsed.y.toLocaleString("en-US", {
                                style: "percent",
                                minimumSignificantDigits: 1,
                                maximumSignificantDigits: 4,
                            });
                        },
                    },
                },
            },
        },
    };
}

export function diceChartDatapoints(diceProbability: Record<number, number>): { label: string, value: number }[] {
    const sortedKeys = Object.keys(diceProbability).sort((a, b) => parseInt(a) - parseInt(b));
    const sortedDatapoints = sortedKeys.map((key) => ({
        label: key,
        value: diceProbability[parseInt(key)],
    }));
    return sortedDatapoints
}
