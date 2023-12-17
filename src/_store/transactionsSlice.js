
// transactionsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, getFirestore, orderBy, query } from "firebase/firestore";
import { app } from "../_utils/firebaseConnection";

const db = getFirestore(app);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    data: [],
    currentPage: 0,
    itemsPerPage: 10,
    isLoading: false,
    filter: "",
  },
  reducers: {
    setTransactionsData: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      // if (action.payload) {
      //   state.data = [];
      // }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
      console.log("Filter updated to:", action.payload);
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
  },
});

export const {
  setTransactionsData,
  setCurrentPage,
  setLoading,
  setFilter,
  setItemsPerPage,
} = transactionsSlice.actions;

export const fetchTransactionsData = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {

    const productsCollection = collection(db, "transactions");
    const querySnapshot = await getDocs( query(productsCollection, orderBy("_id", "desc"))); // this  sorting data
    const productsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(setTransactionsData(productsData));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


// export const fetchTransactionsData = () => async (dispatch) => {
//   dispatch(setLoading(true));
//   try {
//     const productsCollection = collection(db, "transactions");

//     // Add orderBy to sort the data by "_id" in ascending order
//     const querySnapshot = await getDocs(
//       // Use orderBy to sort the data by "_id" in ascending order
//       query(productsCollection, orderBy("_id", "desc"))
//     );

//     const productsData = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     dispatch(setTransactionsData(productsData));

//     // Real-time updates using onSnapshot
//     const unsubscribe = onSnapshot(
//       // Use orderBy to sort the data by "_id" in ascending order
//       query(productsCollection, orderBy("_id", "desc")),
//       (snapshot) => {
//         const updatedData = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         dispatch(setTransactionsData(updatedData));
//       }
//     );

//     // Save the unsubscribe function for later cleanup
//     return unsubscribe;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

export default transactionsSlice.reducer;
