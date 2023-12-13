const default_difficulty = "medium"
const consoleOutput = false

function rollAll(difficulty = default_difficulty) {
    rollButtplug(difficulty)
    rollUnderwear(difficulty)
    rollOutfit(difficulty)
    rollBDSM(difficulty)
    rollWrists(difficulty)
    rollAnkles(difficulty)
}

function rollButtplug(difficulty = default_difficulty) {
    var rollUse = r10()
    var result = [{ rollType: "Use", roll: rollUse, decision: findDecision(buttplug[difficulty]["use"], rollUse)["use"] }]
    if (result[0].decision) {
        var rollSize = r10()
        result.push({ rollType: "Size", roll: rollSize, decision: findDecision(buttplug[difficulty]["size"], rollSize)["size"] })
    }

    if (consoleOutput) { printResult("Buttplug", result) }
    return result
}

function rollClothing(difficulty = default_difficulty) {
    const category = "Clothing"

    var rollScheme = r10()
    var result = [getDecisionObj(category, difficulty, "scheme", rollScheme)]

    if (result[0].decision == "Normal") {
        var rollUnderwear = r10()
        result.push(getDecisionObj(category, difficulty, "underwear", rollUnderwear))

        if (result[1].decision == "Bra + Panties") {
            var rollBra = r10()
            result.push(getDecisionObj(category, difficulty, "bra", rollBra))

            var rollPanties = r10()
            result.push(getDecisionObj(category, difficulty, "panties", rollPanties))

            var rollTop = r10()
            result.push(getDecisionObj(category, difficulty, "top", rollTop))
        }

        var rollBottom = r10()
        result.push(getDecisionObj(category, difficulty, "bottom", rollBottom))

        var rollLimbs = r10()
        result.push(getDecisionObj(category, difficulty, "limbs", rollLimbs))
    } else if (result[0].decision == "Activewear") {
        var rollPanties = r10()
        result.push(getDecisionObj(category, difficulty, "panties", rollPanties))
    }

    if (consoleOutput) { printResult("Clothing", result) }
    return result
}

function rollBDSM(difficulty = default_difficulty) {
    var rollCount = r10()
    var result = [{ rollType: "Count", roll: rollCount, decision: findDecision(bdsm[difficulty]["count"], rollCount)["count"] }]

    if (difficulty == "hard") {
        result.push({ rollType: "Gear", roll: "Automatic", decision: "Any Collar" })
    } else if (difficulty == "extreme") {
        result.push({ rollType: "Gear", roll: "Automatic", decision: "Heavy Collar" })
    }

    var selected = []
    var i = 0
    while (i < result[0].decision) {
        var rollGear = r10()
        var gear = findDecision(bdsm[difficulty]["gear"], rollGear)["gear"]
        if (selected.includes(gear)) {
            continue
        } else {
            selected.push(gear)
            i++
        }
        result.push({ rollType: "Gear", roll: rollGear, decision: gear })
    }

    if (consoleOutput) { printResult("BDSM", result) }
    return result
}

function rollBondage(difficulty = default_difficulty) {
    var rollBinding = r10()
    var result = [getDecisionObj("Bondage", difficulty, "binding", rollBinding)]

    if (consoleOutput) { printResult("Wrists", result) }
    return result
}

/* Helpers */

function findDecision(decisionSet, roll) {
    for (const decision of decisionSet) {
        if (decision.min <= roll && roll <= decision.max) {
            return decision
        }
    }
}

function getDecisionObj(category, difficulty, rollType, roll) {
    return { rollType: rollType, roll: roll, decision: findDecision(categoryDists(category)[difficulty][rollType], roll)[rollType] }
}

function printResult(category, result) {
    console.log(`--- ${category} ---`);
    for (const roll of result) {
        console.log(`${roll.rollType} roll: ${roll.roll} - ${roll.decision}`)
    }
}

/**
* Parameters: numeric min, numeric max, boolean integer
* Return: random numeric between min and max inclusive. Reduced to int if (integer == true)
**/
function randRange(min, max, integer) {
    if (integer) {
        return Math.floor(Math.random() * ((max - min) + 1) + min);
    } else {
        return Math.random() * ((max - min) + 1) + min;
    }
}

/**
 * All roulette probabilities are based on a 1-10 distribution
 * @returns random integer between 1 and 10
 */
function r10() {
    return randRange(1, 10, true)
}

/* --- Roulette Probability Distributions --- */
/*
* - Constant object for each category 
* - key for each difficulty
* - key for each decision 
*/
export const buttplug = {
    easy: {
        use: [
            { min: 1, max: 7, use: false }, // 70%
            { min: 8, max: 10, use: true } // 30%
        ],
        size: [
            { min: 1, max: 10, size: "Small" } // 100%
        ]
    },
    medium: {
        use: [
            { min: 1, max: 5, use: false }, // 50%
            { min: 6, max: 10, use: true } // 50%
        ],
        size: [
            { min: 1, max: 7, size: "Small" }, // 70%
            { min: 8, max: 10, size: "Medium" } // 30%
        ]
    },
    hard: {
        use: [
            { min: 1, max: 3, use: false }, // 30%
            { min: 4, max: 10, use: true } // 70%
        ],
        size: [
            { min: 1, max: 3, size: "Small" }, // 30%
            { min: 4, max: 8, size: "Medium" }, // 50%
            { min: 9, max: 10, size: "Large" } // 20%
        ]
    },
    extreme: {
        use: [
            { min: 1, max: 10, use: true } // 100%
        ],
        size: [
            { min: 1, max: 4, size: "Medium" }, // 40%
            { min: 5, max: 7, size: "Large" }, // 30%
            { min: 8, max: 9, size: "Dildo" }, // 20%
            { min: 10, max: 10, size: "Hook to Collar" } // 10%
        ]
    }
}

export const clothing = {
    easy: {
        scheme: [
            { min: 1, max: 10, scheme: "Normal", description: "Randomly selected clothing" },
        ],
        underwear: [
            { min: 1, max: 9, underwear: "Bra + Panties" },
            { min: 10, max: 10, underwear: "Bodysuit" }
        ],
        bra: [
            { min: 1, max: 8, bra: "Any Bra" },
            { min: 9, max: 10, bra: "Padded Bra" },
        ],
        panties: [
            { min: 1, max: 8, panties: "Any Panties" },
            { min: 9, max: 10, panties: "Thong" },
        ],
        top: [
            { min: 1, max: 5, top: "None" },
            { min: 6, max: 10, top: "T-shirt" },
        ],
        bottom: [
            { min: 1, max: 4, bottom: "None" },
            { min: 5, max: 7, bottom: "Any Pants" },
            { min: 8, max: 10, bottom: "Skirt" },
        ],
        limbs: [
            { min: 1, max: 4, limbs: "None" },
            { min: 5, max: 8, limbs: "Thigh High Socks" },
            { min: 9, max: 10, limbs: "Thigh High Socks + Arm Gloves" },
        ],
    },
    medium: {
        scheme: [
            { min: 1, max: 8, scheme: "Normal", description: "Randomly selected clothing" },
            { min: 9, max: 9, scheme: "Activewear", description: "Sports bra and athletic tights" },
            { min: 10, max: 10, scheme: "Rope Harness", description: "Rope harness over chest and crotch instead of clothing" },
        ],
        underwear: [
            { min: 1, max: 7, underwear: "Bra + Panties" },
            { min: 8, max: 9, underwear: "Bodysuit" },
        ],
        bra: [
            { min: 1, max: 7, bra: "Any Bra" },
            { min: 8, max: 10, bra: "Padded Bra" },
        ],
        panties: [
            { min: 1, max: 5, panties: "Any Panties" },
            { min: 6, max: 10, panties: "Thong" },
        ],
        top: [
            { min: 1, max: 5, top: "None" },
            { min: 6, max: 10, top: "T-shirt" },
        ],
        bottom: [
            { min: 1, max: 3, bottom: "None" },
            { min: 4, max: 6, bottom: "Any Pants" },
            { min: 7, max: 9, bottom: "Skirt" },
        ],
        limbs: [
            { min: 1, max: 3, limbs: "None" },
            { min: 4, max: 8, limbs: "Thigh High Socks" },
            { min: 9, max: 10, limbs: "Thigh High Socks + Arm Gloves" },
        ],
    },
    hard: {
        scheme: [
            { min: 1, max: 5, scheme: "Normal", description: "Randomly selected clothing" },
            { min: 5, max: 8, scheme: "Activewear", description: "Sports bra and athletic tights" },
            { min: 9, max: 10, scheme: "Rope Harness", description: "Rope harness over chest and crotch instead of clothing" },
        ],
        underwear: [
            { min: 1, max: 6, underwear: "Bra + Panties" },
            { min: 7, max: 10, underwear: "Bodysuit" },
        ],
        bra: [
            { min: 1, max: 4, bra: "Any Bra" },
            { min: 5, max: 10, bra: "Padded Bra" },
        ],
        panties: [
            { min: 1, max: 3, panties: "Any Panties" },
            { min: 4, max: 10, panties: "Thong" },
        ],
        top: [
            { min: 1, max: 3, top: "None" },
            { min: 4, max: 10, top: "T-shirt" },
        ],
        bottom: [
            { min: 1, max: 2, bottom: "None" },
            { min: 3, max: 5, bottom: "Any Pants" },
            { min: 6, max: 8, bottom: "Skirt" },
        ],
        limbs: [
            { min: 1, max: 2, limbs: "None" },
            { min: 4, max: 7, limbs: "Thigh High Socks" },
            { min: 8, max: 10, limbs: "Thigh High Socks + Arm Gloves" },
        ],
    },
    extreme: {
        scheme: [
            { min: 1, max: 2, scheme: "Normal", description: "Randomly selected clothing" },
            { min: 3, max: 6, scheme: "Activewear", description: "Sports bra and athletic tights" },
            { min: 7, max: 10, scheme: "Rope Harness", description: "Rope harness over chest and crotch instead of clothing" },
        ],
        underwear: [
            { min: 1, max: 5, underwear: "Bra + Panties" },
            { min: 6, max: 10, underwear: "Bodysuit" },
        ],
        bra: [
            { min: 1, max: 1, bra: "Any Bra" },
            { min: 2, max: 10, bra: "Padded Bra" },
        ],
        panties: [
            { min: 1, max: 10, panties: "Thong" },
        ],
        top: [
            { min: 1, max: 2, top: "None" },
            { min: 3, max: 10, top: "T-shirt" },
        ],
        bottom: [
            { min: 1, max: 1, bottom: "None" },
            { min: 2, max: 5, bottom: "Any Pants" },
            { min: 6, max: 10, bottom: "Skirt" },
        ],
        limbs: [
            { min: 1, max: 3, limbs: "Thigh High Socks" },
            { min: 4, max: 10, limbs: "Thigh High Socks + Arm Gloves" },
        ],
    }
}

export const bdsm = {
    easy: {
        count: [
            { min: 1, max: 5, count: 0 }, // 50%
            { min: 6, max: 8, count: 1 }, // 30%
            { min: 9, max: 10, count: 2 } // 20%
        ],
        gear: [
            { min: 1, max: 5, gear: "Any Collar" }, // 50%
            { min: 6, max: 8, gear: "Blindfold" }, // 30%
            { min: 9, max: 10, gear: "Earplugs" }, // 20%
        ]
    },
    medium: {
        count: [
            { min: 1, max: 2, count: 0 }, // 20%
            { min: 3, max: 5, count: 1 }, // 30%
            { min: 6, max: 8, count: 2 }, // 30%
            { min: 9, max: 10, count: 3 } // 20%
        ],
        gear: [
            { min: 1, max: 5, gear: "Any Collar" }, // 50%
            { min: 6, max: 8, gear: "Blindfold" }, // 30%
            { min: 9, max: 10, gear: "Earplugs" }, // 20%
        ]
    },
    hard: {
        count: [
            { min: 1, max: 2, count: 0 }, // 20%
            { min: 3, max: 5, count: 1 }, // 30%
            { min: 6, max: 8, count: 2 }, // 30%
            { min: 9, max: 10, count: 3 } // 20%
        ],
        gear: [
            // Any Collar is automatic on hard
            { min: 1, max: 4, gear: "Upgrade to Heavy Collar" }, // 40%
            { min: 5, max: 7, gear: "Blindfold" }, // 40%
            { min: 8, max: 9, gear: "Earplugs" }, // 40%
            // { min: 9, max: 10, gear: "Mouth Gag"}, // 20%
        ]
    },
    extreme: {
        count: [
            { min: 1, max: 2, count: 1 }, // 20%
            { min: 3, max: 6, count: 2 }, // 40%
            { min: 7, max: 9, count: 3 }, // 30%
            { min: 10, max: 10, count: 4 } // 10%
        ],
        gear: [
            // Heavy Collar is automatic on extreme
            { min: 1, max: 4, gear: "Blindfold" }, // 30%
            { min: 5, max: 8, gear: "Earplugs" }, // 30%
            // { min: 7, max: 8, gear: "Mouth Gag"}, // 20%
            { min: 9, max: 10, gear: "Chastity Cage" }, // 20%
        ]
    },
}

export const bondage = {
    easy: {
        binding: [
            { min: 1, max: 5, binding: "None" }, // 50%
            { min: 6, max: 10, binding: "Wrists Together in Front, Ankles Together" } // 50%
        ]
    },
    medium: {
        binding: [
            { min: 1, max: 3, binding: "None" }, // 30%
            { min: 4, max: 8, binding: "Wrists Together in Front, Ankles Together" }, // 50%
            { min: 9, max: 10, binding: "Wrists To Collar, Ankles Together" } // 20%

        ]
    },
    hard: {
        binding: [
            { min: 1, max: 2, binding: "None" }, // 20%
            { min: 2, max: 5, binding: "Wrists Together in Front, Ankles Together" }, // 40%
            { min: 6, max: 8, binding: "Wrists To Collar, Ankles Together" }, // 30%
            { min: 9, max: 10, binding: "Together to Bed" } // 10%
        ]
    },
    extreme: {
        binding: [
            { min: 1, max: 3, binding: "Wrists To Collar, Ankles Together" }, // 30%
            { min: 4, max: 5, binding: "Together to Bed" }, // 20%
            { min: 6, max: 7, binding: "Spread Eagle" }, // 20%
            { min: 8, max: 9, binding: "Wrists Together in Back, Ankles Together" }, // 20%
            { min: 10, max: 10, binding: "Hogtie" }, // 10%
        ]
    },
}

export function categoryDists(category) {
    switch (category) {
        case "Buttplug": return buttplug
        case "Clothing": return clothing
        case "BDSM": return bdsm
        case "Bondage": return bondage
    }
}

export function rollCategory(category, difficulty = default_difficulty) {
    switch (category) {
        case "Buttplug": return rollButtplug(difficulty)
        case "Clothing": return rollClothing(difficulty)
        case "BDSM": return rollBDSM(difficulty)
        case "Bondage": return rollBondage(difficulty)
    }
}   