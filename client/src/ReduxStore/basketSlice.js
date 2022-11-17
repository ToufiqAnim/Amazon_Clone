import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingIndex = state.cartItems.findIndex(
        (basketItem) => basketItem._id === action.payload._id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
      } else {
        const groupedProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(groupedProduct);
      }
    },
    decreaseFromCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (basketItem) => basketItem._id === action.payload._id
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
        state.cartItems = nextCartItems;
      }
    },

    removeFromCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (basketItem) => basketItem._id === action.payload._id
      );
      let newCart = [...state.cartItems];

      if (itemIndex >= 0) {
        newCart.splice(itemIndex, 1);
      } else {
        console.warn(
          `The Product With This ID (${action.payload._id}) Does Not Exit`
        );
      }
      state.cartItems = newCart;
    },

    cartTotals: (state, action) => {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    emptyCart(state, action) {
      state.cartItems = [];
    },
  },
});
export const {
  addToCart,
  decreaseFromCart,
  removeFromCart,
  emptyCart,
  cartTotals,
} = cartSlice.actions;
export const selectItems = (state) => state.cart.cartItems;

export default cartSlice.reducer;
