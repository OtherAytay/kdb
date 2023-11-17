'use client'
import { BrandLink, RatingBadge } from '@/app/components';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Modal,
  OverlayTrigger,
  Popover, Row,
  Spinner,
  Table, Tooltip
} from 'react-bootstrap';
import { db, exportItems, exportKDB, importIntoKDB, importItems, importKDB } from './db';
import { categoryDisplayName, displayDate } from './utilities';

export default function Home() {
  const items = useLiveQuery(() => db.item.toArray());
  const [view, setView] = useState("list");
  const [selected, setSelected] = useState([]);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importType, setImportType] = useState('db_replace');

  if (!items) { return }

  if (localStorage["view"] != view) {
    changeView(localStorage["view"])
  }

  function changeView(view) {
    setView(view)
    localStorage["view"] = view
  }

  function handleSelect(item_id) {
    var selection = structuredClone(selected)
    if (selection.includes(item_id)) {
      selection.pop(item_id)
      setSelected(selection)
    } else {
      selection.push(item_id)
      setSelected(selection)
    }
  }

  function clearSelection() {
    setSelected([])
    const checkboxes = document.querySelectorAll("[id^=select_item_]")
    for (const checkbox of checkboxes) { checkbox.checked = false }
  }

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
                  <ButtonGroup size="sm" className="me-2">
                    <Button variant="outline-general" onClick={() => changeView("list")} className={view == "list" ? "active" : ""}><i className="bi bi-list" /></Button>
                    <Button variant="outline-general" onClick={() => changeView("card")} className={view == "card" ? "active" : ""}><i className="bi bi-grid-3x2-gap" /></Button>
                  </ButtonGroup>
                  {/* Item selector */}
                  <InputGroup size="sm" className="me-2 w-auto">
                    <InputGroup.Text>Selected</InputGroup.Text>
                    <InputGroup.Text>{selected.length}</InputGroup.Text>
                    <Button variant="outline-general" onClick={() => selectBulk(setSelected, "all")}>All</Button>
                    <Button variant="outline-danger" onClick={() => selectBulk(setSelected, "none")}>None</Button>
                    <Button variant="outline-secondary" onClick={() => selectBulk(setSelected, "invert")}>Invert</Button>
                  </InputGroup>
                  {/* Action selector */}
                  <DropdownButton size="sm" variant="primary" title="Item Actions" disabled={selected.length == 0}>
                    <Dropdown.Item onClick={() => { deleteItems(selected); clearSelection() }}>Delete</Dropdown.Item>
                    <Dropdown.Item onClick={() => exportItems(selected)}>Export</Dropdown.Item>
                    <Dropdown.Item>Add Label</Dropdown.Item>
                    <Dropdown.Item>Remove Label</Dropdown.Item>
                    <Dropdown.Item>Add to Group</Dropdown.Item>
                    <Dropdown.Item>Remove from Group</Dropdown.Item>
                  </DropdownButton>
                  <div className="d-flex flex-fill justify-content-end">
                    <DropdownButton size="sm" variant="primary" title="More">
                      <OverlayTrigger
                        placement='left'
                        overlay={<Tooltip className="opacity-100">Import another database to <span className="text-danger">replace</span> the existing one</Tooltip>}>
                        <Dropdown.Item onClick={() => { setImportType("db_replace"); setShowImportModal(true) }}>Import DB</Dropdown.Item>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement='left'
                        overlay={<Tooltip className="opacity-100">Import another database to <span className="text-danger">add</span> to the existing one</Tooltip>}>
                        <Dropdown.Item disabled onClick={() => { setImportType("db_add"); setShowImportModal(true) }}>Import DB into DB</Dropdown.Item>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement='left'
                        overlay={<Tooltip className="opacity-100">Import items to <span className="text-danger">add</span> to the existing database</Tooltip>}>
                        <Dropdown.Item onClick={() => { setImportType("items_add"); setShowImportModal(true) }}>Import Items into DB</Dropdown.Item>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement='left'
                        overlay={<Tooltip className="opacity-100">Export existing database to a file</Tooltip>}>
                        <Dropdown.Item onClick={() => exportKDB()}>Export DB</Dropdown.Item>
                      </OverlayTrigger>
                    </DropdownButton>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {view == "card" ?
            <Row xs="1" lg="2">
              {items?.map((item, idx) => (
                <Col key={idx}>
                  <ItemCard item={item} handleSelect={handleSelect} />
                </Col>
              ))}
            </Row>
            : <ItemList items={items} handleSelect={handleSelect} />}
        </Col>
      </Row>
      <ImportModal show={showImportModal} handleClose={() => setShowImportModal(false)} importType={importType} />
    </Container>
  )
}

export function ImportModal({ show, handleClose, importType }) {
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const importTypeText = {
    "db_replace": "Import and Replace DB",
    "db_add": "Import and Add DB",
    "items_add": "Import Items"
  }

  const importFileType = {
    "db_replace": ".kdb",
    "db_add": ".kdb",
    "items_add": ".kdbi"
  }

  const importFunction = {
    "db_replace": importKDB,
    "db_add": importIntoKDB,
    "items_add": importItems
  }

  function startImport() {
    var importFile = document.getElementById("import_file").files[0]
    if (!importFile.name.endsWith(importFileType[importType])) {
      setIsValid(false)
      return
    }
    setLoading(true)
    importFunction[importType](importFile, () => { setLoading(false); handleClose() })
  }

  return (
    <Modal show={show} onHide={() => { setLoading(false); handleClose() }}>
      <Modal.Header closeButton className="fs-5">
        {importTypeText[importType]}
      </Modal.Header>
      <Modal.Body>
        <Form.Control id="import_file" className={!isValid ? "is-invalid" : ""} type="file" accept={importFileType[importType]} />
        <Form.Control.Feedback type="invalid">Please import a {importFileType[importType]} file</Form.Control.Feedback>
      </Modal.Body>
      <Modal.Footer>
        <Button className="d-flex" variant="primary" onClick={() => startImport()}>
          <Spinner as="span" animation="grow" role="status" hidden={!loading} className="me-2"></Spinner>
          <span className="my-auto">Import</span>
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

function deleteItems(selected) {
  db.item.bulkDelete(selected)
}

function selectBulk(setSelected, operation) {
  const checkboxes = document.querySelectorAll("[id^=select_item_]")
  var selection = []

  if (operation == "all") {
    for (const check of checkboxes) {
      check.checked = true
      selection.push(parseInt(check.value))
    }
    setSelected(selection)
  } else if (operation == "none") {
    for (const check of checkboxes) {
      check.checked = false
    }
    setSelected(selection)
  } else {
    for (const check of checkboxes) {
      if (check.checked) {
        check.checked = false
      } else {
        check.checked = true
        selection.push(parseInt(check.value))
      }
    }
    setSelected(selection)
  }
}

export function ItemList({ items, handleSelect }) {
  if (items.length == 0) { return }

  return (
    <Table striped bordered responsive className="text-center text-nowrap">
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
          <ItemRow key={idx} item={item} handleSelect={handleSelect} />
        ))}
      </tbody>
    </Table>

  )
}

export function ItemRow({ item, handleSelect }) {
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
      <RatingBadge rating={item.rating} />
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
      <td><Form.Check type="checkbox" id={"select_item_" + item.id} value={item.id} onClick={(() => handleSelect(item.id))} /></td>
      <td><a className="text-decoration-none text-primary-emphasis" href={"/item/" + item.id}>{item.name}</a></td>
      <td>{categoryDisplayName[item.category]}</td>
      <td>{item.brand_id ? <BrandLink id={item.brand_id} /> : null}</td>
      <td>{description ? description : <Badge bg="danger">None</Badge>}</td>
      <td>{rating}</td>
      <td>{item.currency}{item.price}</td>
      <td>{displayDate(item.purchase_date)}</td>
      <td>{item.user_size}</td>
      <td>{item.user_color}</td>
    </tr>
  )
}

export function ItemCard({ item, handleSelect }) {
  const brand = useLiveQuery(() => db.brand.get(item.brand_id))

  return (
    <Card className="mb-2">
      <Row className="g-0">
        <Col className="col-4 d-flex align-items-center">
          <Card.Img className="my-auto ratio rounded-0 rounded-start" src={item.image} />
        </Col>
        <Col className="col-8">
          <Card.Header>
            <Card.Title className="fw-bold">
              <a className="text-decoration-none text-primary-emphasis" href={"/item/" + item.id}>{item.name}</a>
              <Form.Check className="float-end" id={"select_item_" + item.id} style={{ marginTop: "-0.125rem" }} onClick={() => handleSelect(item.id)} />
              <Badge className="me-2 float-end" bg="primary">{categoryDisplayName[item.category]}</Badge>
              <Badge className="me-2 float-end" bg="warning">{item.rating}<i className="bi bi-star-fill" /></Badge>
            </Card.Title>
            <Card.Subtitle>
              <a className="text-decoration-none" href={brand?.url} target="blank_" rel="noopener noreferrer">{brand?.name}</a>
              <span className="float-end">{item.currency + item.price + " - " + (new Date(item.purchase_date)).toLocaleString().slice(0, 10)}</span>
            </Card.Subtitle>
          </Card.Header>
          <Card.Body className="pt-1">
            {item.description ? item.description : item.rating_note}
            <hr />
            <Row>
              <Col className="col-6">
                {item.mf_size || item.mf_color ?
                  <p>
                    <span className="fs-5 fw-semibold">Manufacturer</span> <br />
                    {item.mf_size ? <span>Size: {item.mf_size}<br /></span> : null}
                    {item.mf_color ? <span>Color: {item.mf_color}<br /></span> : null}
                  </p> : null}
              </Col>
              <Col className="col-6">
                {item.user_size || item.user_color ?
                  <p>
                    <span className="fs-5 fw-semibold">User</span> <br />
                    {item.user_size ? <span>Size: {item.user_size}<br /></span> : null}
                    {item.user_color ? <span>Color: {item.user_color}<br /></span> : null}
                  </p> : null}
              </Col>
            </Row>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  )
}

