import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: JSON.parse(localStorage.getItem("cart")) || [],
  reducers: {
    addToCart: (state, action) => {
      if (
        current(state) === null ||
        current(state).find((i) => i.id === action.payload.id) === undefined
      ) {
        action.payload.quantity = 1;
        state.push(action.payload);
        localStorage.setItem("cart", JSON.stringify([]));
      } else if (
        current(state).find((i) => i.id === action.payload.id) !== undefined
      ) {
        state.find((i) => i.id === action.payload.id).quantity += 1;
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export default cartSlice.reducer;
export const { addToCart } = cartSlice.actions;
