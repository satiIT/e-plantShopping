import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const existingItem = state.items.find(item => item.name === action.payload.name);
            if (existingItem) {
                // If item exists, increase its quantity
                existingItem.quantity += 1;
            } else {
                // If item doesn't exist, add it to the cart with quantity 1
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeItem: (state, action) => {
            // Remove item based on its name
            state.items = state.items.filter(item => item.name !== action.payload.name);
        },
        updateQuantity: (state, action) => {
            const { name, amount } = action.payload;
            const existingItem = state.items.find(item => item.name === name);
            if (existingItem && amount >= 0) { // Ensure quantity is non-negative
                // Update the quantity if the item exists
                existingItem.quantity = amount;
            }
        },
        decreaseQuantity: (state, action) => {
            const existingItem = state.items.find(item => item.name === action.payload.name);
            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1; // Decrease quantity if greater than 1
            } else {
                // If quantity is 1 or less, remove the item
                state.items = state.items.filter(item => item.name !== action.payload.name);
            }
        },
    },
});

// Export actions
export const { addItem, removeItem, updateQuantity, decreaseQuantity } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;

// Selector to get total quantity of items in the cart
export const selectTotalQuantity = (state) => {
    return state.cart.items.reduce((total, item) => total + item.quantity, 0);
};

// Selector to get all items in the cart
export const selectCartItems = (state) => state.cart.items;
