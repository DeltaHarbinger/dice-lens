<script setup lang="ts">
import { useDice } from "~/composables/dice";

const { currentDice, addDie, removeDieByIndex } = useDice();
</script>

<template>
  <main class="p-8 space-y-4">
    <div class="flex gap-6 justify-center max-w-full flex-wrap">
      <div v-for="(die, index) in currentDice" :key="`die_${index}`">
        <DiceEdit v-model="currentDice[index]" />
        <button class="text-center w-full text-red-500" @click="removeDieByIndex(index)">Delete</button>
      </div>
    </div>
    <DiceAddTile class="cursor-pointer mx-auto w-fit" @click="addDie()" />
    <ClientOnly>
      <DiceProbability
        v-if="currentDice.length > 0"
        class="max-h-[50vh]"
        :dice="currentDice"
      />
    </ClientOnly>
  </main>
</template>

<style scoped></style>
