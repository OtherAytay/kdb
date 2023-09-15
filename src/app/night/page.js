'use client'
import Image from 'next/image'
import { useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Script from 'next/script'

export default function Home() {
  const [difficulty, setDifficulty] = useState('1');
  const challengeRadios = [
    { name: 'Easy', value: 1 },
    { name: 'Medium', value: 2 },
    { name: 'Hard', value: 3 },
    { name: 'Extreme', value: 4 }
  ]

  return (
    <main>
      <Container className="mt-2">
        <Row>
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
      </Container>
      <Script src="/static/roulette.js" strategy="afterInteractive" />
    </main>

  )
}