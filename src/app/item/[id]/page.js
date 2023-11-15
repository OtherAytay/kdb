'use client'
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
    Popover
} from 'react-bootstrap'
import { db } from '../../db'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function Home({ params }) {
    return (
        <Container className="mt-2">
            <Row>
                <Col>
                    <Card>
                        <Card.Body className="p-2 text-end">
                            <Button className="me-2" variant="general">Edit<i className="ms-2 bi bi-pencil"/></Button>
                            <Button className="me-2" variant="secondary">Export<i className="ms-2 bi bi-download"/></Button>
                            <Button className="me-2" variant="outline-danger">Delete<i className="ms-2 bi bi-trash"/></Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Container>
    )
}