import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const newProduct = action.payload;
            if (!Boolean(state.cartItems.find(product => product._id === newProduct._id))) {

                state.cartItems = [...state.cartItems, newProduct]

            }
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;

            const updatedCartItems = state.cartItems.filter(product => product._id !== productId);
            state.cartItems = updatedCartItems;
        },
        addQuantity: (state, action) => {
            const productId = action.payload;
            const item = state.cartItems.find(product => product._id === productId);

            if (item) {
                // If item exists in cart, increment its quantity
                item.quantity = (item.quantity || 0) + 1;
            } else {
                // Optionally, handle case if item is not found in cart
                console.log("Product not found in cart");
            }
        },
        reduceQuantity: (state, action) => {
            const productId = action.payload;
            const item = state.cartItems.find(product => product._id === productId);
        
            if (item) {
                // Decrease quantity only if it's greater than 1
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    // If quantity is 1, remove the item from the cart
                    state.cartItems = state.cartItems.filter(product => product._id !== productId);
                }
            } else {
                console.log("Product not found in cart");
            }
        },
        
        removeAllFromCart: (state, action) => {
            state.cartItems = []
        }
    }

})

export const { addToCart, removeFromCart, removeAllFromCart, addQuantity, reduceQuantity } = cartSlice.actions

export default cartSlice.reducer;