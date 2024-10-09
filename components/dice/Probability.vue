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
import { diceChartData } from "~/utils/dice/chart";
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

const chart = ref<any>(null);
const chartRef = useTemplateRef("probabilityChart");
const chartLoading = ref(false)

function debounce(callback: (...a: any[]) => void, wait = 1000) {
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

const updateChart = debounce((chartItem, diceData) => {
  if (chart.value) chart.value.destroy();
  chart.value = new Chart(
    chartItem as ChartItem,
    diceChartData(diceProbabilitySet(diceData))
  );
})

watchEffect(() => {
  console.log('ran')
  if (import.meta.client && chartRef.value && props.dice) {
    updateChart(chartRef.value, props.dice.map(die => ({ ...die })))
  }
});
</script>

<template>
  <canvas ref="probabilityChart" class="transition-all" :class="{'blur-lg duration-200': chartLoading, 'duration-500': !chartLoading}"></canvas>
</template>
