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
} from 'react-bootstrap';
import { db } from '../db';
import { useLiveQuery } from 'dexie-react-hooks';

export default function Home() {
    const [showBrandModal, setShowBrandModal] = useState(false);

    // Prefetch related
    const brands = useLiveQuery(() => db.brand.toArray())

    return (
        <main>
            <Container className="mt-2">
                {/* General Item Information */}
                <Row className="mb-2">
                    <Col>
                        <GeneralInfoCard setShowBrandModal={setShowBrandModal}/>
                    </Col>
                </Row>

                <Row>
                    {/* Material */}
                    <Col className="col-12 col-xl-4">
                        <Card className="border-material">
                            <Card.Header className="text-material text-center fs-5">Material Properties</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Row>

                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <CreateBrandModal brands={brands?.map((b) => b.name)} show={showBrandModal} handleClose={() => setShowBrandModal(false)} />
        </main>
    )
}

export function GeneralInfoCard({setShowBrandModal}) {
    // Prefetch related
    const brands = useLiveQuery(() => db.brand.toArray())
    const user_colors = useLiveQuery(() => db.user_color.toArray())
    const user_sizes = useLiveQuery(() => db.user_size.toArray())

    function updateRatingText() {
        document.getElementById("rating_text").innerText = document.getElementById("rating").value
    }

    const [category, setCategory] = useState("dildo")
    const categoryRadios = [
        { name: 'Dildo', value: "dildo" },
        { name: 'Anal Toy', value: "anal" },
        { name: 'BDSM', value: "bdsm" },
        { name: 'Clothing', value: "clothing" },
        { name: 'Cosmetic', value: "cosmetic" }
    ]

    return (
        <Card className="border-general">
            <Card.Header className="text-general text-center fs-4">
                General
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
                                <Form.Label>Item Name</Form.Label>
                                <Form.Control type="text" placeholder="Dildinator 3000" />
                            </Form.Group>
                        </Col>

                        {/* Brand Name */}
                        <Col className="col-12 col-md-6 col-xl-4 mb-2">
                            <Form.Group controlId="brand_name">
                                <Form.Label>Brand</Form.Label>
                                <div className="d-inline-flex w-100">
                                    <Form.Select className="me-2">
                                        <option>Select a brand</option>
                                        {brands?.map((brand) => (
                                            <option value={brand.id}>{brand.name}</option>
                                        ))}
                                    </Form.Select>
                                    <Button variant="outline-secondary" onClick={() => setShowBrandModal(true)}>
                                        Create
                                    </Button>
                                </div>
                            </Form.Group>
                        </Col>

                        {/* Product URL */}
                        <Col className="col-12 col-xl-4 mb-2">
                            <Form.Group controlId="url">
                                <Form.Label>Product URL</Form.Label>
                                <Form.Control type="url" placeholder="https://www.dildostore.com/products/123" />
                            </Form.Group>
                        </Col>

                        {/* Item Image */}
                        <Col className="col-12 col-xl-4 mb-2">
                            <Form.Group controlId="image">
                                <Form.Label>Item Image</Form.Label>
                                <Form.Control type="file" />
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
                                <Form.Control type="date" value={(new Date()).toLocaleDateString('en-CA')} />
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
                        {/* Material */}
                        <Col className="col-12 mb-2">
                            <Form.Group controlId="material">
                                <Form.Label>Material</Form.Label>
                                <Form.Control type="text" placeholder="Silicone" />
                            </Form.Group>
                        </Col>

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
                            <Form.Group controlId="mf_size">
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
                            <Form.Group controlId="mf_color">
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

export function CreateBrandModal({ brands, show, handleClose }) {
    function validateBrand() {
        console.log("validating brand")
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
                        <Form.Label>Brand Name</Form.Label>
                        <Form.Control type="text" list="brand_list" placeholder="Brand Name" onChange={validateBrand} required />
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
            name,
            url,
            note,
            rating,
            rating_note
        });
        console.log(id)
        handleClose()
    } catch (error) {
        console.log(`Failed to add new brand - ${name}: ${error}`);
    }
}

async function createItem() {
    const general = document.forms['general']
}