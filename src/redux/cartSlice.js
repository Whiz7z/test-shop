import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    totalQuantity: JSON.parse(localStorage.getItem("totalQuantity")) || 0,
    totalAmount: JSON.parse(localStorage.getItem("totalAmount")) || 0,
  },
  reducers: {
    addToCart: (state, action) => {
      if (
        current(state).cart === null ||
        current(state).cart.length === 0 ||
        current(state).cart.find((i) => i.id === action.payload.id) ===
          undefined
      ) {
        action.payload.quantity = 1;

        state.cart = [...state.cart, action.payload];
        state.totalQuantity = current(state).totalQuantity + 1;
        state.totalAmount = current(state).totalAmount + action.payload.price;
        state.totalAmount = Number(state.totalAmount.toFixed(2));

        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem(
          "totalQuantity",
          JSON.stringify(state.totalQuantity)
        );
        localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
      } else if (
        current(state).cart.find((i) => i.id === action.payload.id) !==
        undefined
      ) {
        state.cart.find((i) => i.id === action.payload.id).quantity += 1;
        state.totalQuantity = current(state).totalQuantity + 1;
        state.totalAmount = current(state).totalAmount + action.payload.price;
        state.totalAmount = Number(state.totalAmount.toFixed(2));

        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem(
          "totalQuantity",
          JSON.stringify(state.totalQuantity)
        );
        localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
      }
    },
    removeFromCart: (state, action) => {
      state.totalQuantity -= current(state).cart.find(
        (i) => i.id === action.payload
      ).quantity;

      state.totalAmount -=
        current(state).cart.find((i) => i.id === action.payload).price *
        current(state).cart.find((i) => i.id === action.payload).quantity;
      state.totalAmount = Number(state.totalAmount.toFixed(2));
      state.cart.splice(
        state.cart.findIndex((i) => i.id === action.payload),
        1
      );

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem(
        "totalQuantity",
        JSON.stringify(state.totalQuantity)
      );
      localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
    },

    decreaseQuantity: (state, action) => {
      if (
        current(state).cart.find((i) => i.id === action.payload.id).quantity > 1
      ) {
        state.cart.find((i) => i.id === action.payload.id).quantity -= 1;
        state.totalQuantity -= 1;
        state.totalAmount -= action.payload.price;
        state.totalAmount = Number(state.totalAmount.toFixed(2));

        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem(
          "totalQuantity",
          JSON.stringify(state.totalQuantity)
        );
        localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
      } else if (
        current(state).cart.find((i) => i.id === action.payload.id).quantity ===
        1
      ) {
        state.totalQuantity -= 1;
        state.cart.splice(
          state.cart.findIndex((i) => i.id === action.payload.id),
          1
        );
        state.totalAmount -= action.payload.price;
        state.totalAmount = Number(state.totalAmount.toFixed(2));

        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem(
          "totalQuantity",
          JSON.stringify(state.totalQuantity)
        );
        localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
      }
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      localStorage.removeItem("cart");
      localStorage.removeItem("totalQuantity");
      localStorage.removeItem("totalAmount");
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, decreaseQuantity, clearCart } =
  cartSlice.actions;
