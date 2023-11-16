'use client'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Button,
    Card,
    Badge,
    Table,
    OverlayTrigger,
    Popover,
    ListGroup,
    ListGroupItem
} from 'react-bootstrap'
import { db } from '../../db'
import { BrandLink, RatingBadge } from '@/app/components';
import { categoryDisplayName, displayDate, toDisplayName } from '../../utilities';

export default function Home({ params }) {
    const item = useLiveQuery(() => db.item.get(parseInt(params.id)))

    if (!item) { return }

    return (
        <Container fluid="md" className="mt-2">
            <Row className="mb-2">
                <Col>
                    <Card>
                        <Card.Body className="p-2 text-end">
                            <Button size="sm" className="me-2" variant="general">Edit<i className="ms-2 bi bi-pencil" /></Button>
                            <Button size="sm" className="me-2" variant="secondary">Export<i className="ms-2 bi bi-download" /></Button>
                            <Button size="sm" className="me-2" variant="outline-danger">Delete<i className="ms-2 bi bi-trash" /></Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="g-2">
                <Col className="col-6 col-xl-4 d-flex align-items-center">
                    <img className="rounded ratio ratio-1x1" src={item.image} />
                </Col>
                <Col className="col-6 col-xl-8">
                    <Card className="border-general">
                        <Card.Header className="text-center">
                            <Card.Title className="text-general fs-4 fw-semibold">{item.name}</Card.Title>
                            <Card.Subtitle>{categoryDisplayName[item.category]} By <BrandLink id={item.brand_id}></BrandLink></Card.Subtitle>
                        </Card.Header>
                        <Card.Body className="text-center">
                            <p>Purchased on <span className="text-general">{displayDate(item.purchase_date)}</span> for <span className="text-success">{item.currency}{item.price}</span></p>
                            <hr />
                            {item.rating_note ? <div>{item.rating_note}<hr /></div> : null}
                            {item.mf_size || item.mf_color ?
                                <p>
                                    <span className="fs-5 fw-semibold">Manufacturer</span> <br />
                                    {item.mf_size ? "Size: " + item.mf_size + " | " : null} {item.mf_color ? "Size: " + item.mf_color : null}
                                </p> : null}
                            {item.user_size || item.user_color ?
                                <p>
                                    <span className="fs-5 fw-semibold">User</span> <br />
                                    {item.user_size ? "Size: " + item.user_size + " | " : null} {item.user_color ? "Size: " + item.user_color : null}
                                </p> : null}
                        </Card.Body>
                    </Card>
                    <Card className="mt-2 border-warning">
                        <Card.Body className="d-flex align-items-center">
                            <div className="d-flex align-items-center fs-4 me-2">
                                <RatingBadge rating={item.rating} />
                            </div>
                            <div className="flex-fill">
                                {item.rating_note}

                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <hr />
            <Row className="mt-2 g-2">
                <Col className="col-xl-4">
                    <Card className="border-property">
                        <Card.Header className="text-property text-center fs-5">Properties</Card.Header>
                        <Card.Body>
                            <ListGroup>
                                {Object.entries(item).filter(([k, v]) => k.startsWith("property_") && v).map(([property, value], idx) => (
                                    <ListGroup.Item key={idx} className="w-100 text-center">
                                        <span className="text-property me-2">{propertyDisplayName(property)}</span>
                                        <span className="">{value}</span>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            {/* {Object.entries(item).filter(([k, v]) => k.startsWith("property_")).map(([property, value], idx) => (
                                <ListGroup key={idx} horizontal className="w-100 mb-1">
                                    <ListGroup.Item className="w-100 d-flex align-items-center text-property">{propertyDisplayName(property)}</ListGroup.Item>
                                    <ListGroup.Item className="w-100 d-flex align-items-center">{value}</ListGroup.Item>
                                </ListGroup>
                            ))} */}
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="col-xl-4">
                    <Card className="border-feature">
                        <Card.Header className="text-feature text-center fs-5">Features</Card.Header>
                        <Card.Body>
                            <ListGroup>
                                {Object.entries(item).filter(([k, v]) => k.startsWith("feature_") && v).map(([feature, value], idx) => (
                                    <ListGroup.Item key={idx} className="w-100 text-center">
                                        <span className="text-feature me-2">{propertyDisplayName(feature)}</span>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card></Col>

                <Col className="col-xl-4">
                    <Card className="border-dimension">
                        <Card.Header className="text-dimension text-center fs-5">Dimensions</Card.Header>
                        <Card.Body>
                            <ListGroup>
                                {Object.entries(item).filter(([k, v]) => k.startsWith("dimension_") && v).map(([dimension, value], idx) => (
                                    <ListGroup.Item key={idx} className="w-100 text-center">
                                        <span className="text-dimension me-2">{propertyDisplayName(dimension)}</span>
                                        <span className="">{value}</span>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

function propertyDisplayName(property) {
    var result = property.replace("property_", "").replace("feature_", "").replace("dimension_", "")
    return toDisplayName(result)
}