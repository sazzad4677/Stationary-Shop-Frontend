import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TOrder = {
    shippingAddress: {
        address1: string;
        address2: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    products: {
        productId: string;
        quantity: number;
    }[];
    totalPrice: number;
};

interface OrderState {
    orderData: TOrder | null;
}

const initialState: OrderState = {
    orderData: null, // Initial state where no order data is stored
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrderData: (state, action: PayloadAction<OrderState["orderData"]>) => {
            state.orderData = action.payload;
        },
        clearOrderData: (state) => {
            state.orderData = null;
        },
    },
});

export const { setOrderData, clearOrderData } = orderSlice.actions;

export default orderSlice.reducer;