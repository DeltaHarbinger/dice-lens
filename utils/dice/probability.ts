import type { DieInfo } from ".";

export function diceProbabilitySet(
  diceInfo: DieInfo[]
): Record<number, number> {
  if (diceInfo.length === 0) return {};

  for(let die of diceInfo) {
    if (!die.sideCount || die.sideCount < 1) {
      return {}
    }
  }

  // const flattenedDiceInfo = diceInfo.reduce<DieInfo[]>((previous: DieInfo[], current: DieInfo): DieInfo[] => {
  //   for (let count = 0; count < (current.diceAmount || 1); count += 1) {
  //     previous.push({ ...current})
  //   }
  //   return previous
  // }, [])

  if (diceInfo.length === 1) {
    if (diceInfo[0].advantage) {
        return advantageProbabilitySet(diceInfo)
    }
    if (diceInfo[0].disadvantage) {
        return disadvantageProbabilitySet(diceInfo)
    }
    const probabilitySet: Record<number, number> = {};
    for (let side = 1; side <= diceInfo[0].sideCount; side += 1) {
        probabilitySet[side] = 1 / diceInfo[0].sideCount;
    }
    return probabilitySet;
  }

  const individualProbabilities = diceInfo.map((die) =>
    diceProbabilitySet([die])
  );

  return diceCombinationProbability(individualProbabilities)
}

function advantageProbabilitySet(diceInfo: DieInfo[]): Record<number, number> {
  const probabilitySet: Record<number, number> = {};
  if (diceInfo.length === 1) {
    for (let side = 1; side <= diceInfo[0].sideCount; side += 1) {
        probabilitySet[side] = ((side) * 2 - 1) / (diceInfo[0].sideCount * diceInfo[0].sideCount);
    }
  }
  // TODO: Support rolling multiple dice with advantage. More likely a recursive function
  return probabilitySet;
}

function disadvantageProbabilitySet(diceInfo: DieInfo[]): Record<number, number> {
    const probabilitySet: Record<number, number> = {};
  if (diceInfo.length === 1) {
    for (let side = 1; side <= diceInfo[0].sideCount; side += 1) {
        probabilitySet[diceInfo[0].sideCount - side + 1] = ((side) * 2 - 1) / (diceInfo[0].sideCount * diceInfo[0].sideCount);
    }
  }
  // TODO: Support rolling multiple dice with advantage. More likely a recursive function
  return probabilitySet;
}

function diceCombinationProbability(diceProbability: Record<number, number>[]): Record<number, number> {
    return diceProbability.reduce((currentProbability, currentSet): Record<number, number> => {
        const combinedSet: Record<number, number> = {}
        Object.keys(currentProbability).forEach((baseFace) => {
            Object.keys(currentSet).forEach((addedFace) => {
                combinedSet[parseInt(baseFace) + parseInt(addedFace)] = (combinedSet[parseInt(baseFace) + parseInt(addedFace)] || 0) + currentProbability[parseInt(baseFace)] * currentSet[parseInt(addedFace)]
            })
        })
        return combinedSet
    })
}
