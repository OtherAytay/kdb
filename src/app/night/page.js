'use client'
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import { categoryDists } from './roulette.js';
import { rollCategory } from './roulette.js';

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
    resetAll()
  }, [difficulty])

  return (
    <main>
      <Container className="mt-2">
        {/* Options */}
        <Row className="mb-2">
          <Col className="d-flex justify-content-center">
            <Card className="p-2 overflow-x-auto">
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
              <div class="d-flex mt-2">
                <Button
                  id="clear_all"
                  type="button"
                  variant="danger"
                  className="me-2"
                  style={{ width: '33%' }}
                  onClick={(e) => resetAll()}>
                  Clear
                </Button>
                <Button
                  id="roll_all"
                  type="button"
                  className="flex-fill"
                  onClick={(e) => rollAll(difficulty)}>
                  Roll All
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
        {/* Roulette Cards */}
        <ClothingCard difficulty={difficulty} />
        <Row className="d-flex" data-masonry="">
          <RouletteCard category="Buttplug" difficulty={difficulty} />
          <RouletteCard category="BDSM" difficulty={difficulty} />
          <RouletteCard category="Bondage" difficulty={difficulty} />
        </Row>
      </Container>
      {/* <Script id="masonry">{`var msnry = new Masonry('[data-masonry]')`}</Script> */}
    </main>
  )
}



const CategoryCode = {
  "Buttplug": "sexuality",
  "Clothing": "feminization",
  "BDSM": "bdsm",
  "Bondage": "bdsm",
}

export function ClothingCard({ difficulty }) {
  return (
    <Row className="mb-2">
      <Col>
        <Card className="border-feminization">
          <Card.Header className="fw-bold text-center text-feminization fs-4">
            Clothing
          </Card.Header>
          <Card.Body>
            {/* Underwear */}
            <h5 className="text-center">Underwear</h5>
            <ListGroup variant="horizontal" className="justify-content-center">
              {categoryDists("Clothing")[difficulty]["underwear"].map((decision, idx) => (
                <ListGroup.Item key={idx + 1} id={"clothing_underwear_" + (idx + 1)}>
                  <Badge bg={CategoryCode["Clothing"]} className="me-2">
                    {decision.min == decision.max ? decision.min : decision.min + "-" + decision.max}
                  </Badge>
                  <span className="float-end">
                    {decision["underwear"] === true ? "Yes" : decision["underwear"] === false ? "No" : decision["underwear"]}
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <hr />

            {/* Bra + Panties */}
            <h5 className="text-center">Bra + Panties</h5>
            <ListGroup variant="horizontal" className="justify-content-center mb-2">
              {categoryDists("Clothing")[difficulty]["bra"].map((decision, idx) => (
                <ListGroup.Item key={idx + 1} id={"clothing_bra_" + (idx + 1)}>
                  <Badge bg={CategoryCode["Clothing"]} className="me-2">
                    {decision.min == decision.max ? decision.min : decision.min + "-" + decision.max}
                  </Badge>
                  <span className="float-end">
                    {decision["bra"] === true ? "Yes" : decision["bra"] === false ? "No" : decision["bra"]}
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <ListGroup variant="horizontal" className="justify-content-center">
              {categoryDists("Clothing")[difficulty]["panties"].map((decision, idx) => (
                <ListGroup.Item key={idx + 1} id={"clothing_panties_" + (idx + 1)}>
                  <Badge bg={CategoryCode["Clothing"]} className="me-2">
                    {decision.min == decision.max ? decision.min : decision.min + "-" + decision.max}
                  </Badge>
                  <span className="float-end">
                    {decision["panties"] === true ? "Yes" : decision["panties"] === false ? "No" : decision["panties"]}
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <hr />

            {/* Top */}
            <h5 className="text-center">Top</h5>
            <ListGroup variant="horizontal" className="justify-content-center">
              {categoryDists("Clothing")[difficulty]["top"].map((decision, idx) => (
                <ListGroup.Item key={idx + 1} id={"clothing_top_" + (idx + 1)}>
                  <Badge bg={CategoryCode["Clothing"]} className="me-2">
                    {decision.min == decision.max ? decision.min : decision.min + "-" + decision.max}
                  </Badge>
                  <span className="float-end">
                    {decision["top"] === true ? "Yes" : decision["top"] === false ? "No" : decision["top"]}
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <hr />

            {/* Bottom */}
            <h5 className="text-center">Bottom</h5>
            <ListGroup variant="horizontal" className="justify-content-center">
              {categoryDists("Clothing")[difficulty]["bottom"].map((decision, idx) => (
                <ListGroup.Item key={idx + 1} id={"clothing_bottom_" + (idx + 1)}>
                  <Badge bg={CategoryCode["Clothing"]} className="me-2">
                    {decision.min == decision.max ? decision.min : decision.min + "-" + decision.max}
                  </Badge>
                  <span className="float-end">
                    {decision["bottom"] === true ? "Yes" : decision["bottom"] === false ? "No" : decision["bottom"]}
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <hr />

            {/* Limbs */}
            <h5 className="text-center">Limbs</h5>
            <ListGroup variant="horizontal" className="justify-content-center">
              {categoryDists("Clothing")[difficulty]["limbs"].map((decision, idx) => (
                <ListGroup.Item key={idx + 1} id={"clothing_limbs_" + (idx + 1)}>
                  <Badge bg={CategoryCode["Clothing"]} className="me-2">
                    {decision.min == decision.max ? decision.min : decision.min + "-" + decision.max}
                  </Badge>
                  <span className="float-end">
                    {decision["limbs"] === true ? "Yes" : decision["limbs"] === false ? "No" : decision["limbs"]}
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
          <Card.Footer className="text-center">
            <Button
              id={"roll_clothing"}
              type="button"
              variant="feminization"
              className="w-50 fw-bold"
              onClick={(e) => handleRoll("Clothing", difficulty)}
            >
              Roll
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  )
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
      <Card border={CategoryCode[category]}>
        <Card.Header className={"fw-bold fs-4 text-center text-" + CategoryCode[category]}>
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

  resetRoll(category)

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
  handleRoll("Clothing", difficulty);
  handleRoll("BDSM", difficulty);
  handleRoll("Bondage", difficulty);
}

function resetRoll(category) {
  for (const decision of document.querySelectorAll('[id^=' + category.toLowerCase() + ']')) {
    if (!decision.id.endsWith("_automatic")) {
      decision.classList.remove('active')
    }
  }
}

function resetAll() {
  resetRoll("Buttplug");
  resetRoll("Clothing");
  resetRoll("BDSM");
  resetRoll("Bondage");
}