import type { DieInfo } from "~/utils/dice"

const defaultDieInfo: DieInfo = {
  sideCount: 6,
  advantage: false,
  disadvantage: false,
  diceAmount: 1,
}

export const useDice = () => {
  const currentDice = useState<DieInfo[]>('currentDice', () => [{ sideCount: 6 }, { sideCount: 6 }])

  function addDie(dieInfo: DieInfo = defaultDieInfo) {
    currentDice.value.push({ ...dieInfo })
  }

  function removeDieByIndex(index: number) {
    currentDice.value.splice(index, 1)
  }
  return { currentDice, addDie, removeDieByIndex }
}
