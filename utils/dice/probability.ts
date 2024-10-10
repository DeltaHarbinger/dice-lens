import type { DieInfo } from ".";

export function diceProbabilitySet(
  diceInfo: DieInfo[]
): Map<number, number> {
  if (diceInfo.length === 0) new Map<number, number>();

  for(let die of diceInfo) {
    if (!die.sideCount || die.sideCount < 1) {
      return new Map<number, number>()
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
    const probabilitySet = new Map<number, number>;
    for (let side = 1; side <= diceInfo[0].sideCount; side += 1) {
        probabilitySet.set(side,  1 / diceInfo[0].sideCount)
    }
    return probabilitySet;
  }

  const individualProbabilities = diceInfo.map((die) =>
    diceProbabilitySet([die])
  );

  return diceCombinationProbability(individualProbabilities)
}

function advantageProbabilitySet(diceInfo: DieInfo[]): Map<number, number> {
  const probabilitySet = new Map<number, number>();
  if (diceInfo.length === 1) {
    for (let side = 1; side <= diceInfo[0].sideCount; side += 1) {
        probabilitySet.set(side, ((side) * 2 - 1) / (diceInfo[0].sideCount * diceInfo[0].sideCount));
    }
  }
  // TODO: Support rolling multiple dice with advantage. More likely a recursive function
  return probabilitySet;
}

function disadvantageProbabilitySet(diceInfo: DieInfo[]): Map<number, number> {
    const probabilitySet = new Map<number, number>();
  if (diceInfo.length === 1) {
    for (let side = 1; side <= diceInfo[0].sideCount; side += 1) {
        probabilitySet.set(diceInfo[0].sideCount - side + 1, ((side) * 2 - 1) / (diceInfo[0].sideCount * diceInfo[0].sideCount)) 
    }
  }
  // TODO: Support rolling multiple dice with advantage. More likely a recursive function
  return probabilitySet;
}

function diceCombinationProbability(diceProbability: Map<number, number>[]): Map<number, number> {
    return diceProbability.reduce((currentProbability, currentSet): Map<number, number> => {
        const combinedSet = new Map<number, number>()
        currentProbability.keys().forEach((baseFace) => {
            currentSet.keys().forEach((addedFace) => {
              combinedSet.set(baseFace + addedFace, (combinedSet.get(baseFace + addedFace) || 0) + ((currentProbability.get(baseFace) || 0) * (currentSet.get(addedFace) || 0))) 
            })
        })
        return combinedSet
    })
}
