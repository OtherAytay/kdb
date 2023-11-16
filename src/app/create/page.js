'use client'
import { useState } from 'react';
import {
    Button,
    Container,
    Card,
    Row,
    Col,
    Form,
    Modal,
    Badge,
    ButtonGroup,
    ToggleButton,
    InputGroup,
    Table
} from 'react-bootstrap';
import { db } from '../db';
import { useLiveQuery } from 'dexie-react-hooks';
import { toDBName, toDisplayName } from '../utilities';

export default function Home() {
    const [showBrandModal, setShowBrandModal] = useState(false);
    const [showPropertyModal, setShowPropertyModal] = useState(false)
    const [showFeatureModal, setShowFeatureModal] = useState(false)
    const [showDimensionModal, setShowDimensionModal] = useState(false)
    const [category, setCategory] = useState("dildo")

    // Prefetch related
    const brands = useLiveQuery(() => db.brand.toArray())

    return (
        <main>
            <Container className="mt-2">
                {/* General Item Information */}
                <Row className="mb-2">
                    <Col>
                        <GeneralInfoCard setShowBrandModal={setShowBrandModal} category={category} setCategory={setCategory} />
                    </Col>
                </Row>
                <Row className="">
                    <Col className="col-12 col-lg-4 mb-2">
                        <CategorySpecificInfoCard setShowModal={setShowPropertyModal} category={category} property="property" />
                    </Col>
                    <Col className="col-12 col-lg-4 mb-2">
                        <CategorySpecificInfoCard setShowModal={setShowFeatureModal} category={category} property="feature" />
                    </Col>
                    <Col className="col-12 col-lg-4 mb-2">
                        <CategorySpecificInfoCard setShowModal={setShowDimensionModal} category={category} property="dimension" />
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center mb-2">
                        <Button variant="primary" size="lg" className="w-100 fw-bold" onClick={() => createItem(category)}>
                            Create Item
                        </Button>
                    </Col>
                </Row>
            </Container>



            {/* Foreign Model Creation Modals */}
            <CreateBrandModal brands={brands?.map((b) => b.name)} show={showBrandModal} handleClose={() => setShowBrandModal(false)} />
            <CreatePropertyModal show={showPropertyModal} handleClose={() => setShowPropertyModal(false)} />
            <CreateFeatureModal show={showFeatureModal} handleClose={() => setShowFeatureModal(false)} />
            <CreateDimensionModal show={showDimensionModal} handleClose={() => setShowDimensionModal(false)} />
        </main>
    )
}

export function GeneralInfoCard({ setShowBrandModal, category, setCategory }) {
    const categoryRadios = [
        { name: 'Dildo', value: "dildo" },
        { name: 'Anal Toy', value: "anal" },
        { name: 'BDSM', value: "bdsm" },
        { name: 'Clothing', value: "clothing" },
        { name: 'Cosmetic', value: "cosmetic" }
    ]
    // Prefetch related
    const brands = useLiveQuery(() => db.brand.toArray())
    const user_colors = useLiveQuery(() => db.user_color.toArray())
    const user_sizes = useLiveQuery(() => db.user_size.toArray())

    function updateRatingText() {
        document.getElementById("rating_text").innerText = document.getElementById("rating").value
    }

    return (
        <Card className="border-general">
            <Card.Header className="text-general text-center fs-4">
                General Properties
            </Card.Header>
            <Card.Body>
                <Form id="general">
                    <Row className="mb-2">
                        {/* Type */}
                        <Col className="text-center">
                            <ButtonGroup>
                                {categoryRadios.map((radio, idx) => (
                                    <ToggleButton
                                        key={idx}
                                        id={`radio-${radio.name.toLowerCase()}`}
                                        type="radio"
                                        variant="outline-general"
                                        className={category == radio.value ? "active" : ""}
                                        name="radio"
                                        value={radio.value}
                                        checked={category == radio.value}
                                        onChange={(e) => { setCategory(e.currentTarget.value) }}>
                                        {radio.name}
                                    </ToggleButton>
                                ))}
                            </ButtonGroup>
                        </Col>
                    </Row>
                    <hr className="border border-general opacity-100" />
                    <Row>
                        {/* Item Name */}
                        <Col className="col-12 col-md-6 col-xl-4 mb-2">
                            <Form.Group controlId="item_name">
                                <Form.Label>Item Name<RequiredSymbol /></Form.Label>
                                <Form.Control type="text" placeholder="Dildinator 3000" required />
                            </Form.Group>
                        </Col>

                        {/* Brand Name */}
                        <Col className="col-12 col-md-6 col-xl-4 mb-2">
                            <Form.Group controlId="brand_id">
                                <Form.Label>Brand</Form.Label>
                                <div className="d-inline-flex w-100">
                                    <Form.Select className="me-2">
                                        <option>Select a brand</option>
                                        {brands?.map((brand, idx) => (
                                            <option key={idx} value={brand.id}>{brand.name}</option>
                                        ))}
                                    </Form.Select>
                                    <Button variant="outline-secondary" onClick={() => setShowBrandModal(true)}>
                                        Create
                                    </Button>
                                </div>
                            </Form.Group>
                        </Col>

                        {/* Product URL */}
                        <Col className="col-12 col-lg-6 col-xl-4 mb-2">
                            <Form.Group controlId="url">
                                <Form.Label>Product URL</Form.Label>
                                <Form.Control type="url" placeholder="https://www.dildostore.com/products/123" />
                            </Form.Group>
                        </Col>

                        {/* Item Image */}
                        <Col className="col-12 col-lg-6 col-xl-4 mb-2">
                            <Form.Group controlId="image">
                                <Form.Label>Item Image</Form.Label>
                                <Form.Control type="file" accept="image/*" />
                            </Form.Group>
                        </Col>

                        {/* Price */}
                        <Col className="col-12 col-sm-6 col-xl-4 mb-2 mb-sm-0">
                            <Form.Group controlId="price">
                                <Form.Label>Price</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control type="number" placeholder="69.69" step="0.01" />
                                </InputGroup>
                            </Form.Group>
                        </Col>

                        {/* Purchase Date */}
                        <Col className="col-12 col-sm-6 col-xl-4 mb-2 mb-sm-0">
                            <Form.Group controlId="purchase_date">
                                <Form.Label>Purchase Date</Form.Label>
                                <Form.Control type="date" defaultValue={(new Date()).toLocaleDateString('en-CA')} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <hr className="border border-general opacity-100" />
                    <Row>
                        {/* Item Description */}
                        <Col className="col-12 col-md-6 mb-2">
                            <Form.Group className="mb-2 h-100 d-flex flex-column" controlId="description" >
                                <Form.Label>Item Description</Form.Label>
                                <Form.Control type="text" as="textarea" className="flex-fill" placeholder="Describe this item..." />
                            </Form.Group>
                        </Col>

                        <Col className="col-12 col-md-6 mb-2">
                            {/* Rating */}
                            <Form.Group className="mb-2" controlId="rating" >
                                <Form.Label>Rating</Form.Label>
                                <Form.Range variant="primary" min="1" max="5" step="1" onChange={updateRatingText} />
                                <div className="text-center w-100">
                                    <Badge bg="general" className="fs-4">
                                        <span id="rating_text">3</span>
                                    </Badge>
                                </div>
                            </Form.Group>

                            {/* Rating Note */}
                            <Form.Group className="mb-2" controlId="rating_note" >
                                <Form.Label>Rating Note</Form.Label>
                                <Form.Control type="text" as="textarea" placeholder="Explain your rating..." />
                            </Form.Group>
                        </Col>
                    </Row>
                    <hr className="border border-general opacity-100" />

                    <Row>
                        {/* Manufacturer Size */}
                        <Col className="col-12 col-md-6 mb-2">
                            <Form.Group controlId="mf_size">
                                <Form.Label>Manufacturer Size</Form.Label>
                                <Form.Control type="text" placeholder="Medium" />
                            </Form.Group>
                            <Form.Text>Official size as specified by manufacturer</Form.Text>
                        </Col>

                        {/* Manufacturer Color */}
                        <Col className="col-12 col-md-6 mb-2">
                            <Form.Group controlId="mf_color">
                                <Form.Label>Manufacturer Color</Form.Label>
                                <Form.Control type="text" placeholder="Graphite" />
                            </Form.Group>
                            <Form.Text>Official color as specified by manufacturer</Form.Text>
                        </Col>

                        {/* User Size */}
                        <Col className="col-12 col-md-6 mb-2">
                            <Form.Group controlId="user_size">
                                <Form.Label>User Size</Form.Label>
                                <Form.Control type="text" list="user_sizes" placeholder="Small" />
                            </Form.Group>
                            <Form.Text>Size as specified by user</Form.Text>
                            <datalist id="user_sizes">
                                {user_sizes?.map((size, idx) => <option key={idx} value={size.name} />)}
                            </datalist>
                        </Col>

                        {/* User Color */}
                        <Col className="col-12 col-md-6 mb-2">
                            <Form.Group controlId="user_color">
                                <Form.Label>User Color</Form.Label>
                                <Form.Control type="text" list="user_colors" placeholder="Silver" />
                            </Form.Group>
                            <Form.Text>Color as specified by user</Form.Text>
                            <datalist id="user_colors">
                                {user_colors?.map((color, idx) => <option key={idx} value={color.name} />)}
                            </datalist>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    )
}

export function CategorySpecificInfoCard({ setShowModal, category, property }) {
    switch (property) {
        case "property": var store = db.property; break;
        case "feature": var store = db.feature; break;
        case "dimension": var store = db.dimension; break
    }
    const categoryProps = useLiveQuery(() => store.where('category').equals(category).toArray(), [category])
    if (property == "property") {
        var propertyBody = (
            <Row>
                {categoryProps?.map((prop, idx) => (
                    <Col key={idx} className="col-12 col-md-6 col-lg-12 mb-2">
                        <Form.Group controlId={property + "_" + prop.name}>
                            <Form.Label>{toDisplayName(prop.name)}</Form.Label>
                            <Form.Control type="text" placeholder={prop.placeholder} />
                            {prop.description ? <Form.Text>{prop.description}</Form.Text> : null}
                        </Form.Group>
                    </Col>
                ))}
            </Row>
        )

    } else if (property == "feature") {
        var propertyBody = (
            <div>
                <Row>
                    {/* Features */}
                    <Col className="col-12 mb-2 text-center justify-content-center">
                        <Table striped>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Feature</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categoryProps?.map((feature, idx) => (
                                    <tr key={idx}>
                                        <td><Form.Check inline id={property + "_" + feature.name} type="checkbox" /></td>
                                        <td>{toDisplayName(feature.name)}</td>
                                        <td>{feature.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        )
    } else {
        var propertyBody = (
            <div>
                {categoryProps?.map((dim, idx) => (
                    <Form.Group key={idx} className="mb-2" controlId={property + "_" + dim.name}>
                        <Form.Label>{toDisplayName(dim.name)}</Form.Label>
                        <InputGroup>
                            <Form.Control type="number" placeholder="6.9" />
                            <InputGroup.Text>in</InputGroup.Text>
                        </InputGroup>
                        <Form.Text>{dim.description}</Form.Text>
                    </Form.Group>
                ))}
            </div>
        )
    }

    return (
        <Card className={"h-100 border-" + property} style={{ maxHeight: "100vh" }}>
            <Card.Header className={"text-center fs-4 text-" + property}>
                {property == "property" ? "Properties" :
                    property == "feature" ? "Features" : "Dimensions"}
            </Card.Header>
            <Card.Body className="overflow-auto">
                <Form id={property}>
                    {propertyBody}
                </Form>
            </Card.Body>
            <Card.Footer className="text-center">
                <Button variant={property} onClick={() => setShowModal(true)} /* add onclick to open feature modal */>
                    Add Property
                </Button>
            </Card.Footer>
        </Card>
    )
}

export function CreateBrandModal({ brands, show, handleClose }) {
    function validateBrand() {
        var brandInput = document.getElementById("new_brand_name")
        if (brands.indexOf(brandInput.value) >= 0) {
            brandInput.classList.add("is-invalid")
        } else {
            brandInput.classList.remove("is-invalid")
        }
    }

    function updateRatingText() {
        document.getElementById("new_brand_rating_text").innerText = document.getElementById("new_brand_rating").value
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Create New Brand
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form novalidate className="needs-validation" id="new_brand">
                    {/* Brand Name */}
                    <Form.Group className="mb-2" controlId="new_brand_name" >
                        <Form.Label>Brand Name<RequiredSymbol /></Form.Label>
                        <Form.Control type="text" placeholder="Brand Name" onChange={validateBrand} required />
                        <Form.Control.Feedback type="invalid">This brand already exists</Form.Control.Feedback>
                    </Form.Group>

                    {/* Website URL */}
                    <Form.Group className="mb-2" controlId="new_brand_url" >
                        <Form.Label>Website</Form.Label>
                        <Form.Control type="text" placeholder="Website URL" />
                    </Form.Group>

                    {/* Note */}
                    <Form.Group className="mb-2" controlId="new_brand_note" >
                        <Form.Label>Note</Form.Label>
                        <Form.Control type="text" as="textarea" placeholder="Details about this brand..." />
                    </Form.Group>

                    {/* Rating */}
                    <Form.Group className="mb-2" controlId="new_brand_rating" >
                        <Form.Label>Rating</Form.Label>
                        <Form.Range min="1" max="5" step="1" onChange={updateRatingText} />
                        <div className="text-center w-100">
                            <Badge bg="primary" className="fs-4">
                                <span id="new_brand_rating_text">3</span>
                            </Badge>
                        </div>
                    </Form.Group>

                    {/* Rating Note */}
                    <Form.Group className="mb-2" controlId="new_brand_rating_note" >
                        <Form.Label>Rating Note</Form.Label>
                        <Form.Control type="text" as="textarea" placeholder="Explain your rating..." />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => createBrand(handleClose)}>Create Brand</Button>
                <Button variant="danger" onClick={handleClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}

export function CreatePropertyModal({ show, handleClose }) {
    const [invalid, setInvalid] = useState(["name_empty", "category"])
    const [isChanged, setIsChanged] = useState(false)

    async function validateProperty() {
        setIsChanged(true)

        var nameInput = document.getElementById("new_property_name")
        var categoryInput = document.getElementById("new_property_category")
        var name = toDBName(nameInput.value)

        var invalids = []
        if (nameInput.value == "") {
            invalids.push("name_empty")
        } else {
            var taken = await db.property.where({ name: name, category: categoryInput.value }).toArray()
            if (taken.length > 0) {
                invalids.push("name_taken")
            }
        }
        if (categoryInput.value == "Select a category") {
            invalids.push("category")
        }
        console.log(invalids)
        setInvalid(invalids)
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className="text-property">
                    Create New Property
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate className="needs-validation" id="new_property">
                    {/* Property Name */}
                    <Form.Group className="mb-2" controlId="new_property_name" >
                        <Form.Label>Property Name<RequiredSymbol /></Form.Label>
                        <Form.Control type="text" className={(invalid.indexOf("name_taken") >= 0 || invalid.indexOf("name_empty") >= 0) && isChanged ? "is-invalid" : ""} placeholder="Property Name" onChange={validateProperty} required />
                        <Form.Control.Feedback type="invalid">
                            {invalid.indexOf("name_taken") >= 0 ? "This property already exists for this category" : "This field is required and cannot be empty"}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Category */}
                    <Form.Group className="mb-2" controlId="new_property_category" >
                        <Form.Label>Category<RequiredSymbol /></Form.Label>
                        <Form.Select onChange={validateProperty} required>
                            <option>Select a category</option>
                            {categorySelect.map((category, idx) => (
                                <option key={idx} value={category.value}>{category.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Description */}
                    <Form.Group className="mb-2" controlId="new_property_description" >
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="e.g. Description, Examples" />
                        <Form.Text>Explanatory text that will show here</Form.Text>
                    </Form.Group>

                    {/* Placeholder */}
                    <Form.Group className="mb-2" controlId="new_property_placeholder" >
                        <Form.Label>Placeholder</Form.Label>
                        <Form.Control type="text" placeholder="this is a placeholder" />
                        <Form.Text>Example text that will show inside the textbox</Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="property" disabled={invalid.length > 0} onClick={() => createProperty(handleClose)}>Create Property</Button>
                <Button variant="outline-danger" onClick={handleClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}

export function CreateFeatureModal({ show, handleClose }) {
    const [invalid, setInvalid] = useState(["name_empty", "category"])
    const [isChanged, setIsChanged] = useState(false)

    async function validateFeature() {
        setIsChanged(true)

        var nameInput = document.getElementById("new_feature_name")
        var categoryInput = document.getElementById("new_feature_category")
        var name = toDBName(nameInput.value)

        var invalids = []
        if (nameInput.value == "") {
            invalids.push("name_empty")
        } else {
            var taken = await db.feature.where({ name: name, category: categoryInput.value }).toArray()
            if (taken.length > 0) {
                invalids.push("name_taken")
            }
        }
        if (categoryInput.value == "Select a category") {
            invalids.push("category")
        }
        console.log(invalids)
        setInvalid(invalids)
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className="text-feature">
                    Create New Feature
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate className="needs-validation" id="new_feature">
                    {/* Feature Name */}
                    <Form.Group className="mb-2" controlId="new_feature_name" >
                        <Form.Label>Feature Name<RequiredSymbol /></Form.Label>
                        <Form.Control type="text" className={(invalid.indexOf("name_taken") >= 0 || invalid.indexOf("name_empty") >= 0) && isChanged ? "is-invalid" : ""} placeholder="Property Name" onChange={validateFeature} required />
                        <Form.Control.Feedback type="invalid">
                            {invalid.indexOf("name_taken") >= 0 ? "This feature already exists for this category" : "This field is required and cannot be empty"}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Category */}
                    <Form.Group className="mb-2" controlId="new_feature_category" >
                        <Form.Label>Category<RequiredSymbol /></Form.Label>
                        <Form.Select onChange={validateFeature} required>
                            <option>Select a category</option>
                            {categorySelect.map((category, idx) => (
                                <option key={idx} value={category.value}>{category.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Description */}
                    <Form.Group className="mb-2" controlId="new_feature_description" >
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="e.g. Description, Examples" />
                        <Form.Text>Explanatory text that will show here</Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="feature" disabled={invalid.length > 0} onClick={() => createFeature(handleClose)}>Create Property</Button>
                <Button variant="outline-danger" onClick={handleClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}

export function CreateDimensionModal({ show, handleClose }) {
    const [invalid, setInvalid] = useState(["name_empty", "category"])
    const [isChanged, setIsChanged] = useState(false)

    async function validateDimension() {
        setIsChanged(true)

        var nameInput = document.getElementById("new_dimension_name")
        var categoryInput = document.getElementById("new_dimension_category")
        var name = toDBName(nameInput.value)

        var invalids = []
        if (nameInput.value == "") {
            invalids.push("name_empty")
        } else {
            var taken = await db.dimension.where({ name: name, category: categoryInput.value }).toArray()
            if (taken.length > 0) {
                invalids.push("name_taken")
            }
        }
        if (categoryInput.value == "Select a category") {
            invalids.push("category")
        }
        console.log(invalids)
        setInvalid(invalids)
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className="text-dimension">
                    Create New Dimension
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate className="needs-validation" id="new_dimension">
                    {/* Feature Name */}
                    <Form.Group className="mb-2" controlId="new_dimension_name" >
                        <Form.Label>Dimension Name<RequiredSymbol /></Form.Label>
                        <Form.Control type="text" className={(invalid.indexOf("name_taken") >= 0 || invalid.indexOf("name_empty") >= 0) && isChanged ? "is-invalid" : ""} placeholder="Property Name" onChange={validateDimension} required />
                        <Form.Control.Feedback type="invalid">
                            {invalid.indexOf("name_taken") >= 0 ? "This dimension already exists for this category" : "This field is required and cannot be empty"}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Category */}
                    <Form.Group className="mb-2" controlId="new_dimension_category" >
                        <Form.Label>Category<RequiredSymbol /></Form.Label>
                        <Form.Select onChange={validateDimension} required>
                            <option>Select a category</option>
                            {categorySelect.map((category, idx) => (
                                <option key={idx} value={category.value}>{category.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Description */}
                    <Form.Group className="mb-2" controlId="new_dimension_description" >
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="e.g. Description, Examples" />
                        <Form.Text>Explanatory text that will show here</Form.Text>
                    </Form.Group>

                    {/* Placeholder */}
                    <Form.Group className="mb-2" controlId="new_dimension_placeholder" >
                        <Form.Label>Placeholder</Form.Label>
                        <Form.Control type="text" placeholder="this is a placeholder" />
                        <Form.Text>Example text that will show inside the textbox</Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dimension" disabled={invalid.length > 0} onClick={() => createDimension(handleClose)}>Create Property</Button>
                <Button variant="outline-danger" onClick={handleClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}

async function createBrand(handleClose) {
    const newBrandForm = document.forms['new_brand']

    var name = newBrandForm['new_brand_name'].value
    if (name == "") { return }
    var url = newBrandForm['new_brand_url'].value
    var note = newBrandForm['new_brand_note'].value
    var rating = newBrandForm['new_brand_rating'].value
    var rating_note = newBrandForm['new_brand_rating_note'].value

    try {
        const id = await db.brand.add({
            name: name,
            url: url,
            note: note,
            rating: parseInt(rating),
            rating_note: rating_note
        });
        handleClose()
    } catch (error) {
        console.log(`Failed to add new brand - ${name}: ${error}`);
    }
}

async function createProperty(handleClose) {
    const newPropertyForm = document.forms['new_property']

    var name = newPropertyForm['new_property_name'].value
    if (name == "") { return }
    var category = newPropertyForm['new_property_category'].value
    if (category == "Select a category") { return }
    var description = newPropertyForm['new_property_description'].value
    var placeholder = newPropertyForm['new_property_description'].value

    try {
        const id = await db.property.add({
            name: toDBName(name),
            category: category,
            description: description,
            placeholder: placeholder
        })
        handleClose()
    } catch (error) {
        console.log(`Failed to add new property to ${category} - ${name}: ${error}`)
    }
}

async function createFeature(handleClose) {
    const newFeatureForm = document.forms['new_feature']

    var name = newFeatureForm['new_feature_name'].value
    if (name == "") { return }
    var category = newFeatureForm['new_feature_category'].value
    if (category == "Select a category") { return }
    var description = newFeatureForm['new_feature_description'].value

    try {
        const id = await db.feature.add({
            name: toDBName(name),
            category: category,
            description: description,
        })
        handleClose()
    } catch (error) {
        console.log(`Failed to add new feature to ${category} - ${name}: ${error}`)
    }
}

async function createDimension(handleClose) {
    const newDimensionForm = document.forms['new_dimension']

    var name = newDimensionForm['new_dimension_name'].value
    if (name == "") { return }
    var category = newDimensionForm['new_dimension_category'].value
    if (category == "Select a category") { return }
    var description = newDimensionForm['new_dimension_description'].value
    var placeholder = newDimensionForm['new_dimension_description'].value

    try {
        const id = await db.dimension.add({
            name: toDBName(name),
            category: category,
            description: description,
            placeholder: placeholder
        })
        handleClose()
    } catch (error) {
        console.log(`Failed to add new dimension to ${category} - ${name}: ${error}`)
    }
}

function imageToDataURL(image) {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onerror = () => {reader.abort(); reject(new DOMException("Problem converting image to DataURL"))}
        reader.onloadend = () => { resolve(reader.result) }
        reader.readAsDataURL(image)
    })
}

async function createItem(category) {
    const general = document.forms['general']

    var name = general['item_name'].value
    if (name == "") { return }
    var brand_id = general['brand_id'].value
    var url = general['url'].value
    var image = general['image'].files[0]
    if (image) {
        image = await imageToDataURL(image)
    }
    var price = general['price'].value
    var purchase_date = general['purchase_date'].value
    var description = general['description'].value
    var rating = general['rating'].value
    var rating_note = general['rating_note'].value
    var mf_size = general['mf_size'].value
    var mf_color = general['mf_color'].value
    var user_size = general['user_size'].value
    var user_color = general['user_color'].value

    const properties = [...document.querySelectorAll("[id^=property_]")].map((field) => { return { key: field.id.replace("property_", ""), value: field.value } })
    const features = [...document.querySelectorAll("[id^=feature_]")].map((field) => { return field.checked ? { key: field.id.replace("feature_", ""), value: field.checked } : null }).filter((obj) => obj != null)
    const dimensions = [...document.querySelectorAll("[id^=dimension_]")].map((field) => { return { key: field.id.replace("dimension_", ""), value: field.value } })

    switch (category) {
        case "dildo": var store = db.dildo; break;
        case "anal": var store = db.anal; break;
        case "bdsm": var store = db.bdsm; break;
        case "clothing": var store = db.clothing; break;
        case "cosmetic": var store = db.cosmetic; break;
    }

    db.transaction('rw', db.item, store, async () => {
        const item_id = await db.item.add({
            name: name,
            category: category,
            brand_id: parseInt(brand_id),
            description: description,
            url: url,
            image: image,
            price: parseFloat(price),
            currency: "$",
            purchase_date: purchase_date,
            rating: parseInt(rating),
            rating_note: rating_note,
            mf_size: mf_size,
            mf_color: mf_color,
            user_size: user_size,
            user_color: user_color
        })

        var subitem = { item_id: item_id }
        properties.forEach((property) => subitem["property_" + property.key] = property.value)
        features.forEach((feature) => subitem["feature_" + feature.key] = feature.value)
        dimensions.forEach((dimension) => subitem["dimension_" + dimension.key] = parseFloat(dimension.value))
        const subitem_id = await store.add(subitem)

        const itemUpdate = await db.item.update(item_id, { subitem_id: subitem_id })
    }).then(() => console.log("Item created")).catch((err) => console.error(err.stack))
}

const categorySelect = [
    { name: "Dildo", value: "dildo" },
    { name: "Anal Toys", value: "anal" },
    { name: "BDSM Gear", value: "bdsm" },
    { name: "Clothing", value: "clothing" },
    { name: "Cosmetics", value: "cosmetic" },
]

export function RequiredSymbol() {
    return <span className="text-danger">*</span>
}
