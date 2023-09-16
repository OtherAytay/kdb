'use client'
import Image from 'next/image'
import { useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import ListGroup from 'react-bootstrap/ListGroup'
import Script from 'next/script'
import CategoryDists from './roulette.js'

export default function Home() {
  const [difficulty, setDifficulty] = useState('easy');
  const challengeRadios = [
    { name: 'Easy', value: "easy" },
    { name: 'Medium', value: "medium" },
    { name: 'Hard', value: "hard" },
    { name: 'Extreme', value: "extreme" }
  ]

  return (
    <main>
      <Script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"/>
      <Container className="mt-2">
        {/* Options */}
        <Row className="mb-2">
          <Col className="d-flex justify-content-center">
            <Card className="p-2 d-inline-flex">
              <ButtonGroup>
                {challengeRadios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${radio.name.toLowerCase()}`}
                    type="radio"
                    variant={"outline-" + radio.name.toLowerCase()}
                    className={difficulty == radio.value ? "active" : ""}
                    name="radio"
                    value={radio.value}
                    checked={difficulty == radio.value}
                    onChange={(e) => setDifficulty(e.currentTarget.value)}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Card>
          </Col>
        </Row>
        {/* Roulette Cards */}
        <Row className="overflow-x-auto d-flex" data-masonry="{percentPosition: true}">
            <RouletteCard category="Buttplug" difficulty={difficulty}/>
            <RouletteCard category="Underwear" difficulty={difficulty}/>
            <RouletteCard category="Outfit" difficulty={difficulty}/>
            <RouletteCard category="BDSM" difficulty={difficulty}/>
            <RouletteCard category="Wrists" difficulty={difficulty}/>
            <RouletteCard category="Ankles" difficulty={difficulty}/>
        </Row>
      </Container>
      
    </main>

  )
}

const CategoryCode = {
  "Buttplug": "sexuality",
  "Underwear": "feminization",
  "Outfit": "feminization",
  "BDSM": "bdsm",
  "Wrists": "bdsm",
  "Ankles": "bdsm"
}

export function RouletteCard({ category, difficulty }) {
  return (
    <Col className="col-12 mb-2">
      <Card>
        <Card.Header className="fw-bold text-center fs-4">
          {category}
        </Card.Header>
        <Card.Body>
            {Object.entries(CategoryDists(category)[difficulty]).map(([rollType, decisions]) => (
              [<h5 className="fw-bold">{rollType.charAt(0).toUpperCase() + rollType.slice(1)}</h5>,
              <ListGroup className="mb-2">
                {decisions.map((decision) => (
                  <ListGroup.Item>
                    <Badge bg={CategoryCode[category]}>
                      {decision.min == decision.max ? decision.min : decision.min + "-" + decision.max}
                    </Badge>
                    <span className="float-end">
                      {decision[rollType] === true ? "Yes" : decision[rollType] === false ? "No" : decision[rollType] }
                    </span>
                  </ListGroup.Item>
                ))}
              </ListGroup>]
            ))}
        </Card.Body>
      </Card>
    </Col>

  )
} 

// /* --------------------------- */

// var difficulty = "medium"
// const consoleOutput = true

// function rollAll() {
//     rollButtplug()
//     rollUnderwear()
//     rollOutfit()
//     rollBDSM()
//     rollWrists()
//     rollAnkles()
// }

// function rollButtplug() {
//     rollUse = r10()
//     result = [{rollType: "Use", roll: rollUse, decision: findDecision(buttplug[difficulty]["use"], rollUse)["use"]}]
//     if (result[0].decision) {
//         rollSize = r10()
//         result.push({rollType: "Size", roll: rollSize, decision: findDecision(buttplug[difficulty]["size"], rollSize)["size"]})
//     }

//     if (consoleOutput) {printResult("Buttplug", result)}
//     return result
// }

// function rollUnderwear() {
//     rollUpper = r10()
//     result = [{rollType: "Upper", roll: rollUpper, decision: findDecision(underwear[difficulty]["upper"], rollUpper)["upper"]}]
    
//     rollLower = r10()
//     result.push({rollType: "Lower", roll: rollLower, decision: findDecision(underwear[difficulty]["lower"], rollLower)["lower"]})
    
//     if (consoleOutput) {printResult("Underwear", result)}
//     return result
// }

// function rollOutfit() {
//     rollTop = r10()
//     result = [{rollType: "Top", roll: rollTop, decision: findDecision(outfit[difficulty]["top"], rollTop)["top"]}]

//     rollBottom = r10()
//     result.push({rollType: "Bottom", roll: rollBottom, decision: findDecision(outfit[difficulty]["bottom"], rollBottom)["bottom"]})

//     rollLimbs = r10()
//     result.push({rollType: "Limbs", roll: rollLimbs, decision: findDecision(outfit[difficulty]["limbs"], rollLimbs)["limbs"]})

//     if (consoleOutput) {printResult("Outfit", result)}
//     return result
// }

// function rollBDSM() {
//     rollCount = r10()
//     result = [{rollType: "Count", roll: rollCount, decision: findDecision(bdsm[difficulty]["count"], rollCount)["count"]}]

//     if (difficulty == "hard" || difficulty == "extreme") {
//         result.push({rollType: "Gear", roll: "Automatic", decision: "Collar"})
//     }

//     selected = []
//     i = 0
//     while (i < result[0].decision) {
//         rollGear = r10()
//         gear = findDecision(bdsm[difficulty]["gear"], rollGear)["gear"]
//          if (selected.includes(gear)) {
//             continue
//         } else {
//             selected.push(gear)
//             i++
//         }
//         result.push({rollType: "Gear", roll: rollGear, decision: gear})
//     }
    
//     if (consoleOutput) {printResult("BDSM", result)}
//     return result
// }

// function rollWrists() {
//     rollUse = r10()
//     result = [{rollType: "Use", roll: rollUse, decision: findDecision(wrists[difficulty]["use"], rollUse)["use"]}]
//     if (result[0].decision) {
//         rollBinding = r10()
//         result.push({rollType: "Binding", roll: rollBinding, decision: findDecision(wrists[difficulty]["binding"], rollBinding)["binding"]})
//     }

//     if (consoleOutput) {printResult("Wrists", result)}
//     return result
// }

// function rollAnkles() {
//     rollUse = r10()
//     result = [{rollType: "Use", roll: rollUse, decision: findDecision(ankles[difficulty]["use"], rollUse)["use"]}]
//     if (result[0].decision) {
//         rollBinding = r10()
//         result.push({rollType: "Binding", roll: rollBinding, decision: findDecision(ankles[difficulty]["binding"], rollBinding)["binding"]})
//     }

//     if (consoleOutput) {printResult("Ankles", result)}
//     return result
// }

// /* Helpers */

// function findDecision(decisionSet, roll) {
//     for (const decision of decisionSet) {
//         if (decision.min <= roll && roll <= decision.max) {
//             return decision
//         }
//     }
// }

// function printResult(category, result) {
//     console.log(`--- ${category} ---`);
//     for (const roll of result) {
//         console.log(`${roll.rollType} roll: ${roll.roll} - ${roll.decision}`)
//     }
// }

// /**
// * Parameters: numeric min, numeric max, boolean integer
// * Return: random numeric between min and max inclusive. Reduced to int if (integer == true)
// **/
// function randRange(min, max, integer) {
//     if (integer) {
//         return Math.floor(Math.random() * ((max - min) + 1) + min);
//     } else {
//         return Math.random() * ((max - min) + 1) + min;
//     }
// }

// /**
//  * All roulette probabilities are based on a 1-10 distribution
//  * @returns random integer between 1 and 10
//  */
// function r10() {
//     return randRange(1, 10, true)
// }

// /* --- Roulette Probability Distributions --- */
// /*
// * - Constant object for each category 
// * - key for each difficulty
// * - key for each decision 
// */
// const buttplug = {
//     easy: {
//         use: [
//             { min: 1, max: 7, use: false }, // 70%
//             { min: 8, max: 10, use: true } // 30%
//         ],
//         size: [
//             { min: 1, max: 10, size: "Small" } // 100%
//         ]
//     },
//     medium: {
//         use: [
//             { min: 1, max: 5, use: false }, // 50%
//             { min: 6, max: 10, use: true } // 50%
//         ],
//         size: [
//             { min: 1, max: 7, size: "Small" }, // 70%
//             { min: 8, max: 10, size: "Medium" } // 30%
//         ]
//     },
//     hard: {
//         use: [
//             { min: 1, max: 3, use: false }, // 30%
//             { min: 4, max: 10, use: true } // 70%
//         ],
//         size: [
//             { min: 1, max: 3, size: "Small" }, // 30%
//             { min: 4, max: 8, size: "Medium" }, // 50%
//             { min: 9, max: 10, size: "Large" } // 20%
//         ]
//     },
//     extreme: {
//         use: [
//             { min: 1, max: 10, use: true } // 100%
//         ],
//         size: [
//             { min: 1, max: 4, size: "Medium" }, // 40%
//             { min: 5, max: 7, size: "Large" }, // 30%
//             { min: 8, max: 9, size: "Dildo"}, // 20%
//             { min: 10, max: 10, size: "Hook to Collar"} // 10%
//         ]
//     }
// }

// const underwear = {
//     easy: {
//         upper: [
//             { min: 1, max: 8, upper: "Bra" }, // 80%
//             { min: 9, max: 10, upper: "Padded Bra" } // 20%
//         ],
//         lower: [
//             { min: 1, max: 8, lower: "Panties" }, // 80%
//             { min: 9, max: 10, lower: "Thong" } // 20%
//         ]
//     },
//     medium: {
//         upper: [
//             { min: 1, max: 5, upper: "Bra" }, // 50%
//             { min: 6, max: 8, upper: "Padded Bra" }, // 30%
//             { min: 9, max: 9, upper: "Sports Bra"}, // 10%
//             { min: 10, max: 10, upper: "Rope Harness"} // 10%
//         ],
//         lower: [
//             { min: 1, max: 5, lower: "Panties" }, // 50%
//             { min: 6, max: 9, lower: "Thong" }, // 40%
//             { min: 10, max: 10, lower: "Rope Harness"} // 10%
//         ]
//     },
//     hard: {
//         upper: [
//             { min: 1, max: 3, upper: "Bra" }, // 30%
//             { min: 4, max: 5, upper: "Padded Bra" }, // 20%
//             { min: 6, max: 7, upper: "Sports Bra"}, // 20%
//             { min: 8, max: 10, upper: "Rope Harness"} // 30%
//         ],
//         lower: [
//             { min: 1, max: 3, lower: "Panties" }, // 30%
//             { min: 4, max: 7, lower: "Thong" }, // 40%
//             { min: 8, max: 10, lower: "Rope Harness"} // 30%
            
//         ]
//     },
//     extreme: {
//         upper: [
//             { min: 1, max: 1, upper: "Bra" }, // 10%
//             { min: 2, max: 3, upper: "Padded Bra" }, // 20%
//             { min: 4, max: 5, upper: "Sports Bra"}, // 20%
//             { min: 6, max: 10, upper: "Rope Harness"} // 50%
//         ],
//         lower: [
//             { min: 1, max: 1, lower: "Panties" }, // 10%
//             { min: 2, max: 5, lower: "Thong" }, // 40%
//             { min: 6, max: 10, lower: "Rope Harness"} // 50%
            
//         ]
//     },
// }

// const outfit = {
//     easy: {
//         top: [
//             {min: 1, max: 4, top: "None"}, // 40%
//             {min: 5, max: 9, top: "T-shirt"}, // 50%
//             {min: 10, max: 10, top: "Bodysuit"} // 10%
//         ],
//         bottom: [
//             {min: 1, max: 4, bottom: "None"}, // 40%
//             {min: 5, max: 7, bottom: "Shorts"}, // 30%
//             {min: 8, max: 9, bottom: "Skirt"}, // 20%
//             {min: 10, max: 10, bottom: "Athletic Tight Shorts"}, // 10%
//         ],
//         limbs: [
//             {min: 1, max: 4, limbs: "None"}, // 40%
//             {min: 5, max: 6, limbs: "Thigh High Socks"}, // 20%
//             {min: 7, max: 8, limbs: "Arm Gloves"}, // 20%
//             {min: 9, max: 10, limbs: "Thigh High Socks + Arm Gloves"}, // 20%
//         ]
//     },
//     medium: {
//         top: [
//             {min: 1, max: 3, top: "None"}, // 30%
//             {min: 4, max: 8, top: "T-shirt"}, // 50%
//             {min: 9, max: 10, top: "Bodysuit"} // 20%
//         ],
//         bottom: [
//             {min: 1, max: 3, bottom: "None"}, // 30%
//             {min: 4, max: 6, bottom: "Shorts"}, // 30%
//             {min: 7, max: 9, bottom: "Skirt"}, // 30%
//             {min: 10, max: 10, bottom: "Athletic Tight Shorts"}, // 10%
//         ],
//         limbs: [
//             {min: 1, max: 3, limbs: "None"}, // 30%
//             {min: 4, max: 5, limbs: "Thigh High Socks"}, // 20%
//             {min: 6, max: 7, limbs: "Arm Gloves"}, // 20%
//             {min: 8, max: 10, limbs: "Thigh High Socks + Arm Gloves"}, // 30%
//         ]
//     },
//     hard: {
//         top: [
//             {min: 1, max: 2, top: "None"}, // 20%
//             {min: 3, max: 7, top: "T-shirt"}, // 50%
//             {min: 8, max: 10, top: "Bodysuit"} // 30%
//         ],
//         bottom: [
//             {min: 1, max: 2, bottom: "None"}, // 20%
//             {min: 3, max: 5, bottom: "Shorts"}, // 30%
//             {min: 6, max: 8, bottom: "Skirt"}, // 30%
//             {min: 9, max: 10, bottom: "Athletic Tight Shorts"}, // 20%
//         ],
//         limbs: [
//             {min: 1, max: 2, limbs: "None"}, // 20%
//             {min: 3, max: 4, limbs: "Thigh High Socks"}, // 20%
//             {min: 5, max: 6, limbs: "Arm Gloves"}, // 20%
//             {min: 7, max: 10, limbs: "Thigh High Socks + Arm Gloves"}, // 40%
//         ]
//     },
//     extreme: {
//         top: [
//             {min: 1, max: 1, top: "None"}, // 10%
//             {min: 2, max: 6, top: "T-shirt"}, // 50%
//             {min: 7, max: 10, top: "Bodysuit"} // 40%
//         ],
//         bottom: [
//             {min: 1, max: 1, bottom: "None"}, // 10%
//             {min: 2, max: 4, bottom: "Shorts"}, // 30%
//             {min: 5, max: 7, bottom: "Skirt"}, // 30%
//             {min: 8, max: 10, bottom: "Athletic Tight Shorts"}, // 30%
//         ],
//         limbs: [
//             {min: 1, max: 2, limbs: "Thigh High Socks"}, // 20%
//             {min: 3, max: 4, limbs: "Arm Gloves"}, // 20%
//             {min: 5, max: 10, limbs: "Thigh High Socks + Arm Gloves"}, // 60%
//         ]
//     }
// }

// const bdsm = {
//     easy: {
//         count: [
//             {min: 1, max: 5, count: 0}, // 50%
//             {min: 6, max: 8, count: 1}, // 30%
//             {min: 9, max: 10, count: 2} // 20%
//         ],
//         gear: [
//             {min: 1, max: 5, gear: "Collar"}, // 50%
//             {min: 6, max: 8, gear: "Blindfold"}, // 30%
//             {min: 9, max: 10, gear: "Earplugs"}, // 20%
//         ]
//     },
//     medium: {
//         count: [
//             {min: 1, max: 2, count: 0}, // 20%
//             {min: 3, max: 5, count: 1}, // 30%
//             {min: 6, max: 8, count: 2}, // 30%
//             {min: 9, max: 10, count: 3} // 20%
//         ],
//         gear: [
//             {min: 1, max: 5, gear: "Collar"}, // 50%
//             {min: 6, max: 8, gear: "Blindfold"}, // 30%
//             {min: 9, max: 10, gear: "Earplugs"}, // 20%
//         ]
//     },
//     hard: {
//         count: [
//             {min: 1, max: 2, count: 0}, // 20%
//             {min: 3, max: 5, count: 1}, // 30%
//             {min: 6, max: 8, count: 2}, // 30%
//             {min: 9, max: 10, count: 3} // 20%
//         ],
//         gear: [
//             // Collar is automatic on hard
//             {min: 1, max: 4, gear: "Blindfold"}, // 40%
//             {min: 5, max: 8, gear: "Earplugs"}, // 40%
//             {min: 9, max: 10, gear: "Mouth Gag"}, // 20%
//         ]
//     },
//     extreme: {
//         count: [
//             {min: 1, max: 2, count: 1}, // 20%
//             {min: 3, max: 6, count: 2}, // 40%
//             {min: 7, max: 9, count: 3}, // 30%
//             {min: 10, max: 10, count: 4} // 10%
//         ],
//         gear: [
//             // Collar is automatic on extreme
//             {min: 1, max: 3, gear: "Blindfold"}, // 30%
//             {min: 4, max: 6, gear: "Earplugs"}, // 30%
//             {min: 7, max: 8, gear: "Mouth Gag"}, // 20%
//             {min: 9, max: 10, gear: "Chastity Cage"}, // 20%
//         ]
//     },
// }

// const wrists = {
//     easy: {
//         use: [
//             { min: 1, max: 5, use: false }, // 50%
//             { min: 6, max: 10, use: true } // 50%
//         ],
//         binding: [
//             { min: 1, max: 5, binding: "None" }, // 50%
//             { min: 6, max: 10, binding: "Together in Front" } // 50%
//         ]
//     },
//     medium: {
//         use: [
//             { min: 1, max: 3, use: false }, // 30%
//             { min: 4, max: 10, use: true } // 70%
//         ],
//         binding: [
//             { min: 1, max: 3, binding: "None" }, // 30%
//             { min: 4, max: 8, binding: "Together in Front" }, // 50%
//             { min: 9, max: 10, binding: "Together in Back" } // 20%
//         ]
//     },
//     hard: {
//         use: [
//             { min: 1, max: 10, use: true } // 100%
//         ],
//         binding: [
//             { min: 1, max: 5, binding: "Together in Front" }, // 50%
//             { min: 6, max: 8, binding: "Together in Back" }, // 30%
//             { min: 9, max: 10, binding: "To Collar" } // 20%
//         ]
//     },
//     extreme: {
//         use: [
//             { min: 1, max: 10, use: true } // 100%
//         ],
//         binding: [
//             { min: 1, max: 2, binding: "Together in Front" }, // 20%
//             { min: 3, max: 4, binding: "Together in Back" }, // 20%
//             { min: 5, max: 6, binding: "To Collar" }, // 20%
//             { min: 7, max: 8, binding: "Together to Bed" }, // 20%
//             { min: 9, max: 10, binding: "Spread Eagle" }, // 20%
//         ]
//     },
// }

// const ankles = {
//     easy: {
//         use: [
//             { min: 1, max: 5, use: false }, // 50%
//             { min: 6, max: 10, use: true } // 50%
//         ],
//         binding: [
//             { min: 1, max: 5, binding: "None" }, // 50%
//             { min: 6, max: 10, binding: "Together" } // 50%
//         ]
//     },
//     medium: {
//         use: [
//             { min: 1, max: 3, use: false }, // 30%
//             { min: 4, max: 10, use: true } // 70%
//         ],
//         binding: [
//             { min: 1, max: 3, binding: "None" }, // 30%
//             { min: 4, max: 10, binding: "Together" }, // 70%
//         ]
//     },
//     hard: {
//         use: [
//             { min: 1, max: 10, use: true } // 100%
//         ],
//         binding: [
//             { min: 1, max: 5, binding: "Together" }, // 50%
//             { min: 6, max: 8, binding: "Together to Bed" }, // 30%
//             { min: 9, max: 10, binding: "Spread Eagle" } // 20%
//         ]
//     },
//     extreme: {
//         use: [
//             { min: 1, max: 10, use: true } // 100%
//         ],
//         binding: [
//             { min: 1, max: 2, binding: "Together" }, // 20%
//             { min: 3, max: 6, binding: "Together to Bed" }, // 40%
//             { min: 7, max: 10, binding: "Spread Eagle" }, // 40%
//         ]
//     },
// }

// const CategoryDists = {
//   "Buttplug": buttplug,
//   "Underwear": underwear,
//   "Outfit": outfit,
//   "BDSM": bdsm,
//   "Wrists": wrists,
//   "Ankles": ankles
// }