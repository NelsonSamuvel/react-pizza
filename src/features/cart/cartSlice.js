import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      

        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;

        if(item.quantity === 0) cartSlice.caseReducers.deleteItem(state,action);
      
    },
    clearItem(state) {
      state.cart = [];
    },
  },
});

export const getTotalQuantity = (store) =>
  store.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalPrice = (store) =>
  store.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQuantity = (id) => (store)=>
    store.cart.cart.find(item => item.pizzaId === id)?.quantity?? 0;

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearItem,
} = cartSlice.actions;

export default cartSlice.reducer;
