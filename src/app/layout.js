'use client'
import './globals.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.scss'
import { Inter } from 'next/font/google'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={"vh-100 "}>
        {NavLayout()}
        {children}
      </body>
    </html>
  )
}

export function NavLayout() {
  return (
    <Navbar expand="sm" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">KinkDB</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav variant="pills" className="mx-auto" defaultActiveKey={usePathname()}>
              <Nav.Link as={Link} href="/">Home</Nav.Link>
              <Nav.Link as={Link} href="#create">Create</Nav.Link>
              <Nav.Link as={Link} href="/night">Night</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
