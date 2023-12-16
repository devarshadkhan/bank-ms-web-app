import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Sidebar from "../../_components/Sidebar/Sidebar";
import "../../_styles/pages_stylesheet/AddTransaction.css";
import HeaderNavbar from "../../_components/Navbar/Navbar";
import Add_Transaction_Form from "../../_components/Add_Transaction_Form/Add_Transaction_Form";

const AddTransaction = () => {
  


  return (
    <>
      <section className="home_wrap">
        <Container fluid>
          <Row>
            <Col md={2}>
              <Sidebar />
            </Col>
            <Col md={10}>
              {/* <HeaderNavbar /> */}
              <h1>Add-transaction Page</h1>

                <Add_Transaction_Form />
               
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AddTransaction;
