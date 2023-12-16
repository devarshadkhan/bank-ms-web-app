
// transactionsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, getFirestore } from "firebase/firestore";
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
    const querySnapshot = await getDocs(productsCollection);
    const productsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(setTransactionsData(productsData));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default transactionsSlice.reducer;
