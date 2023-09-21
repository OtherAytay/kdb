'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import ListGroup from 'react-bootstrap/ListGroup'
import dynamic from 'next/dynamic'
import { categoryDists } from './roulette.js'
import { rollCategory } from './roulette.js'

export default function Home() {
  const [difficulty, setDifficulty] = useState('easy');
  const challengeRadios = [
    { name: 'Easy', value: "easy" },
    { name: 'Medium', value: "medium" },
    { name: 'Hard', value: "hard" },
    { name: 'Extreme', value: "extreme" }
  ]

  useEffect(() => {
    const Masonry = require('masonry-layout')
    new Masonry('[data-masonry]').layout()
  }, [difficulty])

  return (
    <main>
      <Container className="mt-2">
        {/* Options */}
        <Row className="mb-2">
          <Col className="d-flex justify-content-center">
            <Card className="p-2 d-inline-flex">
              <ButtonToolbar>
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
                      onChange={(e) => { setDifficulty(e.currentTarget.value) }}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
                <Button
                  id="roll_all"
                  type="button"
                  className="ms-2"
                  onClick={(e) => rollAll(difficulty)}>
                  Roll All
                </Button>
              </ButtonToolbar>
            </Card>
          </Col>
        </Row>
        {/* Roulette Cards */}
        <Row className="overflow-x-auto d-flex" data-masonry="">
          <RouletteCard category="Buttplug" difficulty={difficulty} />
          <RouletteCard category="Underwear" difficulty={difficulty} />
          <RouletteCard category="Outfit" difficulty={difficulty} />
          <RouletteCard category="BDSM" difficulty={difficulty} />
          <RouletteCard category="Wrists" difficulty={difficulty} />
          <RouletteCard category="Ankles" difficulty={difficulty} />
        </Row>
      </Container>
      {/* <Script id="masonry">{`var msnry = new Masonry('[data-masonry]')`}</Script> */}
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
  var automatic = null
  if (category == "BDSM" && (difficulty == "hard" || difficulty == "extreme")) {
    automatic = (
      <ListGroup.Item key='automatic' id={category.toLowerCase() + "_gear_automatic"} className="active">
        <Badge bg={CategoryCode[category]}>
          Automatic
        </Badge>
        <span className="float-end">
          {"Collar"}
        </span>
      </ListGroup.Item>
    )
  }

  return (
    <Col className="col-md-4 col-sm-6 col-xs-12 mb-2">
      <Card>
        <Card.Header className="fw-bold text-center fs-4">
          {category}
        </Card.Header>
        <Card.Body>
          {Object.entries(categoryDists(category)[difficulty]).map(([rollType, decisions], idx) => (
            [<h5 key={"decision_header_" + idx} className="fw-bold">{rollType.charAt(0).toUpperCase() + rollType.slice(1)}</h5>,
            <ListGroup key={"decision_group_" + idx} className="mb-2">
              {rollType == "gear" ? automatic : null}
              {decisions.map((decision, idx) => (
                <ListGroup.Item key={idx + 1} id={category.toLowerCase() + "_" + rollType + "_" + (idx + 1)}>
                  <Badge bg={CategoryCode[category]}>
                    {decision.min == decision.max ? decision.min : decision.min + "-" + decision.max}
                  </Badge>
                  <span className="float-end">
                    {decision[rollType] === true ? "Yes" : decision[rollType] === false ? "No" : decision[rollType]}
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>]
          ))}
        </Card.Body>
        <Card.Footer className="text-center">
          <Button
            id={"roll_" + category.toLowerCase()}
            type="button"
            variant={CategoryCode[category]}
            className="w-75 fw-bold"
            onClick={(e) => handleRoll(category, difficulty)}>
            Roll
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  )
}

function handleRoll(category, difficulty) {
  var results = rollCategory(category, difficulty)
  console.log(results)

  // Reset roll results
  for (const decision of document.querySelectorAll('[id^=' + category.toLowerCase() + ']')) {
    if (!decision.id.endsWith("_automatic")) {
      decision.classList.remove('active')
    }
  }

  for (const result of results.filter((r) => typeof r.roll == 'number')) {
    var idx = 1
    for (const temp of categoryDists(category)[difficulty][result.rollType.toLowerCase()]) {
      if (temp.min <= result.roll && result.roll <= temp.max) {
        break
      } else {
        idx++
      }
    }
    document.getElementById(category.toLowerCase() + "_" + result.rollType.toLowerCase() + "_" + idx).classList.add('active')
  }
}

function rollAll(difficulty) {
  handleRoll("Buttplug", difficulty);
  handleRoll("Underwear", difficulty);
  handleRoll("Outfit", difficulty);
  handleRoll("BDSM", difficulty);
  handleRoll("Wrists", difficulty);
  handleRoll("Ankles", difficulty);
}