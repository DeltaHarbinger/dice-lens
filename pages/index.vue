<script setup lang="ts">
import { useDice } from "~/composables/dice";

const { currentDice, addDie, removeDieByIndex } = useDice();
</script>

<template>
  <main class="p-8 space-y-4">
    <ClientOnly>
      <DiceProbability
        v-if="currentDice.length > 0"
        class="max-h-[50vh]"
        :dice="currentDice"
      />
    </ClientOnly>
    <DiceAddTile id="add-die-button" class="cursor-pointer mx-auto w-fit" @click="addDie()" />
    <div class="w-fit mx-auto">{{ currentDice.length }}</div>
    <div class="flex gap-6 justify-center max-w-full flex-wrap">
      <div v-for="(_, index) in currentDice" :key="`die_${index}`">
        <DiceEdit v-model="currentDice[index]" />
        <button class="text-center w-full text-red-500" @click="removeDieByIndex(index)">Delete</button>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
