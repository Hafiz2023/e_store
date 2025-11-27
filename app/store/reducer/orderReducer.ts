import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Order {
    id: string;
    customer: {
        name: string;
        email: string;
        phone: string;
        address: string;
    };
    items: any[];
    total: number;
    status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
    date: string;
    paymentMethod: string;
}

interface OrderState {
    orders: Order[];
}

const initialState: OrderState = {
    orders: [
        {
            id: 'ORD-001',
            customer: { name: 'John Doe', email: 'john@example.com', phone: '1234567890', address: '123 St' },
            items: [],
            total: 125.00,
            status: 'Completed',
            date: '2024-03-10',
            paymentMethod: 'cod'
        },
        {
            id: 'ORD-002',
            customer: { name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', address: '456 Ave' },
            items: [],
            total: 55.00,
            status: 'Processing',
            date: '2024-03-11',
            paymentMethod: 'easypaisa'
        }
    ],
};

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
            state.orders.unshift(action.payload); // Add to top
        },
        updateOrderStatus: (state, action: PayloadAction<{ id: string; status: Order['status'] }>) => {
            const order = state.orders.find((o) => o.id === action.payload.id);
            if (order) {
                order.status = action.payload.status;
            }
        },
        deleteOrder: (state, action: PayloadAction<string>) => {
            state.orders = state.orders.filter((o) => o.id !== action.payload);
        }
    },
});

export const { addOrder, updateOrderStatus, deleteOrder } = orderSlice.actions;
export default orderSlice.reducer;
