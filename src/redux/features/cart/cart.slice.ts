import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TProduct} from "@/pages/Products";

interface CartItem extends TProduct {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
}

const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const existingItem = state.items.find(
                (item) => item._id === action.payload._id
            );

            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }

            state.totalQuantity += action.payload.quantity;
            state.totalPrice += action.payload.price * action.payload.quantity;
        },
        removeItem(state, action: PayloadAction<string>) {
            const itemIndex = state.items.findIndex(
                (item) => item._id === action.payload
            );
            if (itemIndex !== -1) {
                const item = state.items[itemIndex];
                state.totalQuantity -= item.quantity;
                state.totalPrice -= item.price * item.quantity;
                state.items.splice(itemIndex, 1);

            }
        },
        updateQuantity(
            state,
            action: PayloadAction<{ _id: string; quantity: number }>
        ) {
            const {_id, quantity} = action.payload;
            const existingItem = state.items.find((item) => item._id === _id);
            if (existingItem) {
                if (quantity === 0) return
                const quantityDifference = quantity - existingItem.quantity;
                state.totalQuantity += quantityDifference;
                state.totalPrice += quantityDifference * existingItem.price;
                existingItem.quantity = quantity;

            }

        },
        resetCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        }
    },
});

export const {addItem, removeItem, updateQuantity, resetCart} =
    cartSlice.actions;

export default cartSlice.reducer;