'use client'
import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Table,
  OverlayTrigger,
  Popover,
  InputGroup,
  Form
} from 'react-bootstrap'
import { db } from './db'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function Home() {
  const [items, setItems] = useState([]);
  const [view, setView] = useState("list")
  const [selected, setSelected] = useState([])

  if (items.length == 0) { fetchItems(setItems) }
  console.log(items)

  return (
    <Container fluid>
      <Row>
        <Col className="d-none d-md-flex col-md-3 overflow-y-auto vh-100 bg-light-subtle">

        </Col>
        <Col className="mt-2 col-12 col-md-9">
          <Row className="mb-2">
            <Col>
            {/* Action Toolbar */}
              <Card> 
                <Card.Body className="p-2 d-flex">
                  <InputGroup size="sm" className="me-2 w-auto">
                    {/* Action selector */}
                    <InputGroup.Text>Action</InputGroup.Text>
                    <Form.Select>
                      <option></option>
                      <option>Delete</option>
                      <option>Export</option>
                      <option>Add Label</option>
                      <option>Remove Label</option>
                      <option>Add to Group</option>
                      <option>Remove from Group</option>
                    </Form.Select>
                    <Button variant="primary">Go</Button>
                  </InputGroup>
                  {/* Item selector */}
                  <InputGroup size="sm" className="me-2 w-auto">
                    <InputGroup.Text>Selected</InputGroup.Text>
                    <InputGroup.Text>{selected.length}</InputGroup.Text>
                    <Button variant="outline-general" onClick={() => selectBulk("all")}>All</Button>
                    <Button variant="outline-danger" onClick={() => selectBulk("none")}>None</Button>
                    <Button variant="outline-secondary" onClick={() => selectBulk("invert")}>Invert</Button>
                  </InputGroup>
                  <Button size="sm" variant="primary" className="ms-auto">Import</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {view == "card" ?
            <Row xs="1" lg="2">
              {items?.map((item, idx) => (
                <Col key={idx}>
                  <ItemCard item={item} />
                </Col>
              ))}
            </Row>
            : <ItemList items={items} />}
        </Col>
      </Row>
    </Container>
  )
}

function selectBulk(operation) {
  const checkboxes = document.querySelectorAll("[id^=select_item_]")
  if (operation == "all") {
    for (const check of checkboxes) {
      check.checked = true
    }
  } else if (operation == "none") {
    for (const check of checkboxes) {
      check.checked = false
    }
  } else {
    for (const check of checkboxes) {
      check.checked = !check.checked
    }
  }
}

export function ItemList({ items }) {
  if (items.length == 0) { return }

  return (
    <Table striped bordered hover responsive className="text-center text-nowrap">
      <thead>
        <tr>
          <td></td>
          <td>Name</td>
          <td>Category</td>
          <td>Brand</td>
          <td>Description</td>
          <td>Rating</td>
          <td>Price</td>
          <td>Purchase Date</td>
          <td>User Size</td>
          <td>User Color</td>
        </tr>
      </thead>
      <tbody>
        {items.map((item, idx) => (
          <ItemRow key={idx} item={item} />
        ))}
      </tbody>
    </Table>

  )
}

export function ItemRow({ item }) {
  const ratingPopover = (
    <Popover id={"rating_popover_" + item.id}>
      <Popover.Header>Rating Note</Popover.Header>
      <Popover.Body>
        {item.rating_note}
      </Popover.Body>
    </Popover>
  )

  const rating = (
    <OverlayTrigger trigger="hover focus" placement="auto" overlay={ratingPopover}>
      <Badge as="a" bg="warning" className="text-decoration-none">{item.rating}<i className="bi bi-star-fill" /></Badge>
    </OverlayTrigger>
  )

  if (item.description) {
    var descriptionPopover = (
      <Popover id={"rating_popover_" + item.id}>
        <Popover.Header>Description</Popover.Header>
        <Popover.Body>
          {item.description}
        </Popover.Body>
      </Popover>
    )

    var description = (
      <OverlayTrigger trigger="hover focus" placement="auto" overlay={descriptionPopover}>
        <Badge as="a" bg="success" className="text-decoration-none"><i className="bi bi-card-text" /></Badge>
      </OverlayTrigger>
    )
  }

  return (
    <tr>
      <td><Form.Check type="checkbox" id={"select_item_" + item.id} value={item.id}/></td>
      <td><a className="text-decoration-none" href={"/item/" + item.id}>{item.name}</a></td>
      <td>{categoryDisplayName[item.category]}</td>
      <td><BrandLink id={item.brand_id} /></td>
      <td>{description ? description : <Badge bg="danger">None</Badge>}</td>
      <td>{rating}</td>
      <td>{item.currency}{item.price}</td>
      <td>{(new Date(item.purchase_date)).toLocaleDateString().slice(0, 10)}</td>
      <td>{item.user_size}</td>
      <td>{item.user_color}</td>
    </tr>
  )
}

export function BrandLink({ id }) {
  const brand = useLiveQuery(() => db.brand.get(id))
  if (!brand) { return }
  return (<a className="text-decoration-none" target="blank_" rel="noopener noreferrer" href={brand.url}>{brand.name}</a>)
}

export function ItemCard({ item }) {
  const brand = useLiveQuery(() => db.brand.get(item.brand_id))

  return (
    <Card className="mb-2">
      <Row className="g-0">
        <Col className="col-4">
          <Card.Img className="ratio ratio-1x1 rounded-0 rounded-start" src={item.image} />
        </Col>
        <Col className="col-8">
          <Card.Header>
            <Card.Title className="fw-bold">
              <span>{item.name}</span>
              <Badge className="float-end" bg="primary">{categoryDisplayName[item.category]}</Badge>
              <Badge className="me-2 float-end" bg="warning">{item.rating}<i className="bi bi-star-fill" /></Badge>
            </Card.Title>
            <Card.Subtitle>
              <a className="text-decoration-none" href={brand?.url} target="blank_" rel="noopener noreferrer">{brand?.name}</a>
              <span className="float-end">{item.currency + item.price + " - " + (new Date(item.purchase_date)).toLocaleString().slice(0, 10)}</span>
            </Card.Subtitle>
          </Card.Header>
          <Card.Body className="pt-1">
            {item.description ? item.description : item.rating_note}
          </Card.Body>
        </Col>
      </Row>
    </Card>
  )
}

function fetchItems(setItems) {
  var stores = [db.item, db.dildo, db.anal, db.bdsm, db.clothing, db.cosmetic]
  var results = []

  db.transaction('r', stores, async () => {
    const items = await db.item.toArray()

    for (const item of items) {
      switch (item.category) {
        case "dildo": var store = db.dildo; break;
        case "anal": var store = db.anal; break;
        case "bdsm": var store = db.bdsm; break;
        case "clothing": var store = db.clothing; break;
        case "cosmetic": var store = db.cosmetic; break;
      }

      const subitem = await store.get(item.subitem_id)
      results.push({ ...item, ...subitem })
    }
  }).then(() => setItems(results))
}

const categoryDisplayName = {
  "dildo": "Dildo",
  "anal": "Anal Toy",
  "bdsm": "BDSM Gear",
  "clothing": "Clothing",
  "cosmetic": "Cosmetic",
}

