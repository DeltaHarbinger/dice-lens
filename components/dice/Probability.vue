<script setup lang="ts">
import {
  Chart,
  Colors,
  LineController,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  type ChartItem,
  Filler,
} from "chart.js";
import type { DieInfo } from "~/utils/dice";
import { diceChartData } from "~/utils/dice/chart";
import { diceProbabilitySet } from "~/utils/dice/probability";

interface Props {
  dice: DieInfo[]
}

Chart.register(
  Colors,
  LineController,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip
);

const props = defineProps<Props>();

const chart = ref<any>(null)
const chartRef = useTemplateRef("probabilityChart");

watchEffect(() => {
  if (import.meta.client && chartRef.value) {
    if (chart.value) chart.value.destroy()
    chart.value = new Chart(
      chartRef.value,
      diceChartData(diceProbabilitySet(props.dice)),
    );
  }
})
</script>

<template>
  <canvas ref="probabilityChart"></canvas>
</template>
