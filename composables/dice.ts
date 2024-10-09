import type { DieInfo } from "~/utils/dice"

const defaultDieInfo: DieInfo = {
  sideCount: 6,
  advantage: false,
  disadvantage: false,
  diceAmount: 1,
}

export const useDice = () => {
  const currentDice = useState<DieInfo[]>('currentDice', () => [{ ...defaultDieInfo }, { ...defaultDieInfo }])

  function addDie(dieInfo: DieInfo = defaultDieInfo) {
    currentDice.value.unshift({ ...dieInfo })
  }

  function removeDieByIndex(index: number) {
    currentDice.value.splice(index, 1)
  }
  return { currentDice, addDie, removeDieByIndex }
}
