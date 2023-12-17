import React, { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Sidebar from "../../_components/Sidebar/Sidebar";
import "../../_styles/pages_stylesheet/Home.css";
import TableComp from "../../_components/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { setCurrentPage, setFilter, setItemsPerPage } from "../../_store/transactionsSlice.js";
import { formattedNumber } from "../../_utils/hooks.js";
const Home = () => {
  const dispatch = useDispatch();
  const {
    data: transactionData,
    currentPage,
    itemsPerPage,
    filter
  } = useSelector((state) => state.transactions);
  console.log(transactionData);
  const handlePageClick = (data) => {
    dispatch(setCurrentPage(data.selected));
  };
  const [entriesPerPage, setEntriesPerPage] = useState(itemsPerPage); // State to manage the number of entries per page
  

  const handleEntriesPerPageChange = (event) => {
    const newEntriesPerPage = parseInt(event.target.value, 10);
    setEntriesPerPage(newEntriesPerPage);
    dispatch(setItemsPerPage(newEntriesPerPage)); // Dispatch action to update itemsPerPage in Redux state
  };
  // Calculate the range of entries being displayed
  const startEntry = currentPage * itemsPerPage + 1;
  const endEntry = Math.min(
    (currentPage + 1) * itemsPerPage,
    transactionData.length
  );

  // Total Amount
  const totalAmount = transactionData.reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <>
      <section className="home_wrap">
        <Container fluid>
          <Row>
            <Col md={2}>
              <Sidebar />
            </Col>
            <Col md={10}>
            <div className="headings">
            <h1>My Transactions</h1>
              <h6>Total Amount:{formattedNumber(totalAmount)}</h6>
            </div>
              <div className="bax_1">
                <div className="selct">
                  show{" "}
                  <select name="" id="" onChange={handleEntriesPerPageChange}  value={entriesPerPage}>
                    <option value="1">1</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="500">500</option>
                  </select>
                  Enteries
                </div>

                <div className="search">
                  <label>Search:</label>
                  <input type="text" value={filter} onChange={(e)=> dispatch(setFilter(e.target.value))} />
                </div>
              </div>

              {/* {transactionData.length > 0 ?  */}
              <> 
              <div className="tabLe">
                <TableComp />
              </div>
              <div className="ftr">
                <p>
                  Showing {startEntry} to {endEntry} of {transactionData.length}{" "}
                  entries
                </p>

                <div className="paginate">
                  <ReactPaginate
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    pageCount={Math.ceil(transactionData.length / itemsPerPage)}
                    marginPagesDisplayed={0}
                    pageRangeDisplayed={0}
                    onPageChange={handlePageClick}
                    containerClassName={"paginationBttns"}
                    activeClassName={"active"}
                  
                  />
                </div>
              </div></>
              {/* :<><p className="nodata">No Data Found</p></>} */}
             
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
