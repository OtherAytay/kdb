'use client'
import { BrandLink, RatingBadge } from '@/app/components';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useState, useRef } from 'react';
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownButton, Form,
  FormGroup,
  InputGroup,
  Modal,
  Overlay,
  OverlayTrigger,
  Popover, Row,
  Spinner,
  Table, Tooltip
} from 'react-bootstrap';
import { db, exportItems, exportKDB, importIntoKDB, importItems, importKDB } from './db';
import { categoryDisplayName, displayDate } from './utilities';

export default function Home() {
  const [sort, setSort] = useState("id");
  const [sortAsc, setSortAsc] = useState(true);
  const [showCategories, setShowCategories] = useState(["dildo", "anal", "bdsm", "clothing", "cosmetic"])
  const [view, setView] = useState("list");
  const [filters, setFilters] = useState({})

  useEffect(() => {
    if ("sort" in localStorage && localStorage["sort"] != sort) {
      setSort(localStorage["sort"])
    }

    if ("sortAsc" in localStorage && localStorage["sortAsc"] != sortAsc.toString()) {
      setSortAsc(localStorage["sortAsc"] == "true")
    }

    if ("showCategories" in localStorage && localStorage["showCategories"] != showCategories) {
      setShowCategories(localStorage["showCategories"].split(','))
    }

    if (localStorage["view"] != view) {
      changeView(localStorage["view"])
    }
  }, [])

  const items = useLiveQuery(() => !sortAsc ? db.item.filter((item) => showCategories.includes(item.category) && applyFilters(item, filters)).reverse().sortBy(sort) : db.item.filter((item) => showCategories.includes(item.category) && applyFilters(item, filters)).sortBy(sort), [sort, sortAsc, showCategories, filters]);
  const [selected, setSelected] = useState([]);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importType, setImportType] = useState('db_replace');

  if (!items) { return }

  function changeSort(sort) {
    localStorage["sort"] = sort
    setSort(sort)
  }

  function changeSortAsc(sortAsc) {
    localStorage["sortAsc"] = sortAsc
    setSortAsc(sortAsc)
  }

  function changeShowCategories(category) {
    var categories = structuredClone(showCategories)
    if (categories.includes(category)) {
      categories.splice(categories.indexOf(category), 1)
      localStorage["showCategories"] = categories
      setShowCategories(categories)
    } else {
      categories.push(category)
      localStorage["showCategories"] = categories
      setShowCategories(categories)
    }
  }

  function changeView(view) {
    localStorage["view"] = view
    setView(view)
  }

  function changeFilter(attribute) {
    var newFilters = structuredClone(filters)

    // Keyword filters
    if (["name", "user_size", "user_color"].includes(attribute)) {
      newFilters[attribute] = document.getElementById(attribute).value
    }

    // Range filters
    if (["rating", "price", "purchase_date"].includes(attribute)) {
      newFilters[attribute] = []
      var low = document.getElementById(`${attribute}_low`).value
      var high = document.getElementById(`${attribute}_high`).value
      if (low) { newFilters[attribute].push(["geq", low]) }
      if (high) { newFilters[attribute].push(["leq", high]) }
    }

    setFilters(newFilters)
  }

  function handleSelect(item_id) {
    var selection = structuredClone(selected)
    if (selection.includes(item_id)) {
      selection.splice(selection.indexOf(item_id), 1)
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

  const categoryChecks = [
    { name: 'Dildo', value: "dildo" },
    { name: 'Anal', value: "anal" },
    { name: 'BDSM', value: "bdsm" },
    { name: 'Clothing', value: "clothing" },
    { name: 'Cosmetic', value: "cosmetic" }
  ]

  return (
    <Container fluid>
      <Row>
        <Col className="d-none d-md-block col-md-3 g-0 border-end overflow-y-auto vh-100 bg-light-subtle">
          <Row className="w-100 p-2 g-0 border-bottom">
            <Col>
              <InputGroup className="w-100 d-flex">
                <InputGroup.Text className="border-secondary">Sort By</InputGroup.Text>
                <Form.Select className="border-secondary flex-fill" defaultValue={sort} onChange={(e) => changeSort(e.currentTarget.value)}>
                  <option value="id">Entry Order</option>
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="purchase_date">Purchase Date</option>
                </Form.Select>
                <Button variant="outline-secondary" onClick={() => changeSortAsc(!sortAsc)}>
                  {sortAsc ? <i className="bi bi-arrow-up" /> : <i className="bi bi-arrow-down" />}
                </Button>
              </InputGroup>
            </Col>
          </Row>
          <Row className="p-2">
            <Col>
              <FormGroup>
                <Form.Label>Name</Form.Label>
                <InputGroup>
                  <Form.Control id="name" type="text" onChange={() => changeFilter("name")} />
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
          <Row className="p-2">
            <Col className="">
              <FormGroup>
                <Form.Label>Categories</Form.Label>
                {categoryChecks.map((check, idx) => (
                  <Form.Check
                    key={idx}
                    id={`check-${check.value}`}
                    type="checkbox"
                    name="categoryCheck"
                    value={check.value}
                    className="ms-2"
                    checked={showCategories.includes(check.value)}
                    onChange={(e) => { changeShowCategories(e.currentTarget.value) }}
                    label={check.name} />
                ))}
              </FormGroup>
            </Col>
          </Row>
          <Row className="p-2">
            <Col>
              <FormGroup>
                <Form.Label>Rating Range</Form.Label>
                <InputGroup>
                  <Form.Control placeholder="Low" id="rating_low" type="number" step="1" min="1" max="5" onChange={() => changeFilter("rating")} />
                  <Form.Control placeholder="High" id="rating_high" type="number" step="1" min="1" max="5" onChange={() => changeFilter("rating")} />
                </InputGroup>
                <Form.Text>Values between 1 and 5</Form.Text>
              </FormGroup>
            </Col>
          </Row>
          <Row className="p-2">
            <Col>
              <FormGroup>
                <Form.Label>Price Range</Form.Label>
                <InputGroup>
                  <Form.Control placeholder="Low" id="price_low" type="number" step="0.01" onChange={() => changeFilter("price")} />
                  <Form.Control placeholder="High" id="price_high" type="number" step="0.01" onChange={() => changeFilter("price")} />
                </InputGroup>
                <Form.Text>Without currency symbol</Form.Text>
              </FormGroup>
            </Col>
          </Row>
          <Row className="p-2">
            <Col>
              <FormGroup>
                <Form.Label>Purchase Date Range</Form.Label>
                <InputGroup>
                  <Form.Control placeholder="Low" id="purchase_date_low" type="date" onChange={() => changeFilter("purchase_date")} />
                  <Form.Control placeholder="High" id="purchase_date_high" type="date" onChange={() => changeFilter("purchase_date")} />
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
          <Row className="p-2">
            <Col>
              <FormGroup>
                <Form.Label>User Size</Form.Label>
                <InputGroup>
                  <Form.Control id="user_size" type="text" onChange={() => changeFilter("user_size")} />
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
          <Row className="p-2">
            <Col>
              <FormGroup>
                <Form.Label>User Color</Form.Label>
                <InputGroup>
                  <Form.Control id="user_color" type="text" onChange={() => changeFilter("user_color")} />
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
        </Col>
        <Col className="mt-2 col-12 col-md-9">
          <Row className="mb-2">
            <Col>
              {/* Action Toolbar */}
              <Card className="border-primary sticky-top">
                <Card.Body className="p-2 d-flex">
                  <ButtonGroup size="sm" className="me-2">
                    <Button variant="outline-primary" onClick={() => changeView("list")} className={view == "list" ? "active" : ""}><i className="bi bi-list" /></Button>
                    <Button variant="outline-primary" onClick={() => changeView("card")} className={view == "card" ? "active" : ""}><i className="bi bi-grid-3x2-gap" /></Button>
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
                    <Dropdown.Item className="text-danger" onClick={() => { deleteItems(selected); clearSelection() }}>Delete</Dropdown.Item>
                    <Dropdown.Item onClick={() => exportItems(selected)}>Export</Dropdown.Item>
                    <Dropdown.Item disabled >Add Label</Dropdown.Item>
                    <Dropdown.Item disabled >Remove Label</Dropdown.Item>
                    <Dropdown.Item disabled >Add to Group</Dropdown.Item>
                    <Dropdown.Item disabled >Remove from Group</Dropdown.Item>
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
            <Row xs="1" lg="2" className="g-2">
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
    <OverlayTrigger trigger={["hover", "focus"]} placement="auto" overlay={ratingPopover}>
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
      <OverlayTrigger trigger={["hover", "focus"]} placement="auto" overlay={descriptionPopover}>
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
      <td>{item.rating_note ? rating : <RatingBadge rating={item.rating}/>}</td>
      <td>{item.currency}{item.price}</td>
      <td>{displayDate(item.purchase_date)}</td>
      <td>{item.user_size}</td>
      <td>{item.user_color}</td>
    </tr>
  )
}

export function ItemCard({ item, handleSelect }) {
  const brand = useLiveQuery(() => db.brand.get(item.brand_id))

  const ratingPopover = (
    <Popover id={"rating_popover_" + item.id}>
      <Popover.Header>Rating Note</Popover.Header>
      <Popover.Body>
        {item.rating_note}
      </Popover.Body>
    </Popover>
  )

  const rating = (
    <OverlayTrigger trigger={["hover", "focus"]} placement="auto" overlay={ratingPopover}>
      <RatingBadge rating={item.rating} />
    </OverlayTrigger>
  )

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
              {item.rating_note != "" ? rating : <RatingBadge rating={item.rating}/>}
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

function applyFilters(item, filters) {
  var pass = true
  for (const [attribute, attr_filters] of Object.entries(filters)) {
    if (!item[attribute]) { return false }
    for (const filter of attr_filters) {
      // Keyword filter
      if (typeof filter == "string") {
        pass = pass && item[attribute].toLowerCase().includes(filter.toLowerCase())
      }

      // Value filter
      if (Array.isArray(filter)) {
        const op = filter[0]
        var filter_val = filter[1]
        var item_val = item[attribute]

        if (attribute.includes("date")) {
          filter_val = (new Date(filter_val))
          item_val = (new Date(item_val))
        }

        switch (op) {
          case "lt": pass = pass && item_val < filter_val; break;
          case "leq": pass = pass && item_val <= filter_val; break;
          case "eq": pass = pass && item_val == filter_val; break;
          case "gt": pass = pass && item_val > filter_val; break;
          case "geq": pass = pass && item_val >= filter_val; break;
        }
      }
    }
  }
  return pass
}
