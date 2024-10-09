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

function debounce(callback: (...a: any[]) => void, wait = 1000) {
  let timeoutId: number;
  return (...args: any[]) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

const props = defineProps<Props>();

const chart = ref<any>(null);
const chartRef = useTemplateRef("probabilityChart");

const updateChart = debounce(() => {
  if (chart.value) chart.value.destroy();
  chart.value = new Chart(
    chartRef.value as ChartItem,
    diceChartData(diceProbabilitySet(props.dice))
  );
})

watchEffect(() => {
  console.log('ran')
  if (import.meta.client && chartRef.value && props.dice.length) {
    updateChart()
  }
});
</script>

<template>
  <canvas ref="probabilityChart"></canvas>
</template>
