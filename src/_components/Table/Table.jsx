
// TransactionTable.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import {
  fetchTransactionsData,
  setLoading,
} from "../../_store/transactionsSlice.js";
import { collection, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";
import { app } from "../../_utils/firebaseConnection.js";
import { convertToIndianTime, formattedNumber } from "../../_utils/hooks.js";
const db = getFirestore(app);
const TransactionTable = () => {
  const dispatch = useDispatch();
  const {
    data: transactionData,
    currentPage,
    itemsPerPage,
    isLoading,
    filterBy,
  } = useSelector((state) => state.transactions);
  console.log(filterBy);
  useEffect(() => {
    //  real-time updates do not page refresh 
    const unsubscribe = onSnapshot(
      collection(db, "transactions"),
      
      (snapshot) => {
        const updatedData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(fetchTransactionsData(updatedData));
      }
    );

    return () => {
      // Unsubscribe when the component unmounts
      unsubscribe();
      dispatch(setLoading(false));
    };
  }, [dispatch]);
  // useEffect(() => {

  //   dispatch(fetchTransactionsData());
  //   return () => {
  //     dispatch(setLoading(false));
  //   };
  // }, [dispatch]);



  
  // useEffect(() => {
  //   //  real-time updates do not page refresh with onSnapshot
  //   const unsubscribe = onSnapshot(
  //     // Use orderBy to sort the data by "_id" in ascending order
  //     query(collection(db, "transactions"), orderBy("_id", "desc")),
  //     (snapshot) => {
  //       const updatedData = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));

  //       // Sort the updated data in ascending order by date
  //       updatedData.sort((a, b) => b._id - a._id);

  //       dispatch(fetchTransactionsData(updatedData));
  //     }
  //   );

  //   return () => {
  //     // Unsubscribe when the component unmounts
  //     unsubscribe();
  //     dispatch(setLoading(false));
  //   }
  // },[])
  if (isLoading) {
    return <p>Loading...</p>;
  }

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transactionData.slice(indexOfFirstItem, indexOfLastItem);

  const renderTableData = currentItems
  .filter((item) => {
    console.log('Filter value:', filterBy);
    console.log('Transaction type:', item.transaction_type);
    return filterBy ? item.transaction_type?.toLowerCase()?.includes(filterBy.toLowerCase().trim()) : true;
  })

  .map((item, id) => (
    <tr key={item.id}>
      <td>{id + 1 + currentPage * itemsPerPage}</td>
      <td>{convertToIndianTime(item._id)}</td>
      <td>{item.transaction_type || 'No Type For Transaction'}</td>
      <td>{formattedNumber(item?.amount) || 'No Amount Added'}</td>
    </tr>
  ));

  return (
    <>
      <Table striped="columns" bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Date Created</th>
            <th>Transactions</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>{renderTableData}</tbody>
      </Table>
    </>
  );
};

export default TransactionTable;
