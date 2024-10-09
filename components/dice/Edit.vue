<template>
  <div>
    <DiceFigure
      class="mx-auto cursor-pointer"
      :side-count="model.sideCount || 0"
      :advantage="model.advantage"
      :disadvantage="model.disadvantage"
      :dice-amount="model.diceAmount"
      @click="onDiceClick"
    />
    <div
      ref="diceProbability"
      popover
      class="border border-gray-500 rounded p-4"
    >
      <ClientOnly>
        <DiceProbability class="w-[50hw] min-w-[50vw]" :dice="[model]" />
      </ClientOnly>
    </div>
    <div class="flex flex-col w-full mt-2">
      <input
        v-model.number="model.sideCount"
        type="number"
        min="1"
        class="block w-20 mx-auto"
        pattern="^[0-9]+$"
        @keydown="onSideCountInput"
      />
      <label
        ><input
          v-model="model.advantage"
          type="checkbox"
          :disabled="model.disadvantage"
          class="mr-1"
        />Advantage</label
      >
      <label
        ><input
          v-model="model.disadvantage"
          type="checkbox"
          :disabled="model.advantage"
          class="mr-1"
        />Disadvantage</label
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DieInfo } from "~/utils/dice";

const model = defineModel<DieInfo>({
  default: {
    sideCount: 6,
    advantage: false,
    disadvantage: false,
    diceAmount: 1,
  },
  required: false,
});

const diceProbability = useTemplateRef("diceProbability");

function onDiceClick() {
  diceProbability.value?.showPopover();
}

function validateSideInput(input: string): boolean {
  return (
    input.includes("Arrow") ||
    input === "Backspace" ||
    input === "Delete" ||
    Array(10).keys().toArray().includes(parseInt(input))
  );
}

function onSideCountInput(event: KeyboardEvent) {
  if (!validateSideInput(event.key)) {
    event.preventDefault();
  }
}
</script>
