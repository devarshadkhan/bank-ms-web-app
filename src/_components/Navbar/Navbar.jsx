import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "../../_styles/components_stylesheet/Navbar.css"
import { Link } from 'react-router-dom';
function HeaderNavbar() {
  return (
    <>
      {[ 'md' ].map((expand) => (
        <Navbar key={expand} expand={expand} className="navBar">
          <Container fluid>
            <Navbar.Brand  >Logo</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <Offcanvas.Body>
                  <div className="" id={`offcanvasNavbarLabel-expand-${expand}`}>
                    <ul>
                        <li>
                            <Link to="/">Transaction</Link>
                        </li>
                        <li>
                            <Link to="/add-transaction">Add Transaction</Link>
                        </li>
                    </ul>
            </div>
                  </Offcanvas.Body>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
             
                <Nav className="justify-content-center flex-grow-1 pe-3">
                <h1 className='heading'>Communication Managemenent</h1>
                  {/* <Nav.Link href="#action1">Home</Nav.Link>
                  <Nav.Link href="#action2">Link</Nav.Link> */}
                  {/* <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown> */}
                </Nav>
                {/* <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form> */}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default HeaderNavbar;