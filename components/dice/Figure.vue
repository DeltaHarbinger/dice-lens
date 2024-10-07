<script setup lang="ts">
import type { DieInfo } from "@/utils/dice";

withDefaults(defineProps<DieInfo>(), {
  advantage: false,
  disadvantage: false,
  diceAmount: 1,
});
</script>

<template>
  <div
    class="relative flex min-w-20 min-h-20 border border-black rounded-md w-fit justify-center items-center"
    :class="{ 'border-green-500': advantage, 'border-red-500': disadvantage }"
  >
    <span
      class="block text-4xl font-bold"
      :class="{ 'text-green-500': advantage, 'text-red-500': disadvantage }"
    >
      {{ sideCount }}
    </span>
    <span
      v-if="diceAmount > 1"
      class="absolute flex -top-3 -right-3 bg-black rounded-full min-w-8 min-h-8 animate-ping"
      :class="{ 'bg-green-500': advantage, 'bg-red-500': disadvantage }"
    />
    <span
      v-if="diceAmount > 1"
      class="absolute flex -top-3 -right-3 bg-black rounded-full min-w-8 min-h-8 justify-center"
      :class="{ 'bg-green-500': advantage, 'bg-red-500': disadvantage }"
    >
      <span class="self-center text-sm text-white leading-[0.875rem]">
        {{ diceAmount < 9 ? diceAmount : "9+" }}
      </span>
    </span>
  </div>
</template>

<style scoped></style>
