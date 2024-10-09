<script setup lang="ts">
import {
  Chart,
  Colors,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  type ChartItem,
  Filler,
} from "chart.js";
import type { DieInfo } from "~/utils/dice";
import { diceChartData, diceChartDatapoints } from "~/utils/dice/chart";
import { diceProbabilitySet } from "~/utils/dice/probability";

interface Props {
  dice: DieInfo[];
}

Chart.register(
  Colors,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip
);

const props = defineProps<Props>();

const chart = shallowRef<Chart | null>(null);
const chartRef = useTemplateRef("probabilityChart");
const chartLoading = ref(false)

function debounce(callback: (...a: any[]) => void, wait = 100) {
  let timeoutId: number;
  return (...args: any[]) => {
    chartLoading.value = true
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
      chartLoading.value = false
    }, wait);
  };
};

function createChart(chartItem: ChartItem, diceData: DieInfo[]) {
  chartLoading.value = true
  chart.value = new Chart(
    chartItem,
    diceChartData(diceProbabilitySet(diceData))
  );
  chartLoading.value = false
}

const updateChart = debounce((diceData) => {
  if (!chart.value) return
  const diceDatapoints = diceChartDatapoints(diceProbabilitySet(diceData))
  
  chart.value.data.labels = diceDatapoints.map((point) => point.label)
  chart.value.data.datasets[0].data = diceDatapoints.map((point) => point.value)
  chart.value.update()
})

watch(() => props.dice, () => {
  if (import.meta.client && props.dice) {
    updateChart(props.dice)
  }
}, { deep: true });

onMounted(() => createChart(chartRef.value as ChartItem, props.dice))
</script>

<template>
  <canvas ref="probabilityChart" class="transition-all" :class="{'blur-lg duration-200': chartLoading, 'duration-500': !chartLoading}"></canvas>
</template>
