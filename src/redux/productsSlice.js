import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("https://fakestoreapi.com/products");

    console.log(response);
    return response.data;
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (category) => {
    if (category === "All") {
      const response = await axios.get("https://fakestoreapi.com/products");
      console.log(response);
      return { category: "All", data: response.data };
    }
    const response = await axios.get(
      `https://fakestoreapi.com/products/category/${category}`
    );
    console.log(response);
    return { category: category, data: response.data };
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    data: null,
    status: "idle",
    error: null,
    categoryChoosen: "All",
    searchQuery: "",
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.categoryChoosen = "All";
    },
    setCategory(state, action) {
      state.categoryChoosen = action.payload;
      state.searchQuery = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.categoryChoosen = "All";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
        state.categoryChoosen = action.payload.category;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
export const { setSearchQuery, setCategory } = productsSlice.actions;
