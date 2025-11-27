import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
    id: number | string;
    name: string;
    price: number;
    imageSrc: string;
    category: string;
    stock: number;
    color?: string;
    description?: string;
}

interface ProductState {
    products: Product[];
}

const initialState: ProductState = {
    products: [
        {
            id: 1,
            name: 'Basic Tee',
            price: 35,
            imageSrc: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 't-shirts',
            stock: 100,
            color: 'Black',
            description: 'A comfortable basic tee.'
        },
        {
            id: 2,
            name: 'Basic Tee White',
            price: 35,
            imageSrc: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 't-shirts',
            stock: 80,
            color: 'White',
            description: 'A comfortable basic tee in white.'
        },
        {
            id: 3,
            name: 'Nomad Tumbler',
            price: 89,
            imageSrc: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'accessories',
            stock: 45,
            color: 'Green',
            description: 'Insulated bottle.'
        },
        {
            id: 4,
            name: 'Artwork Tee',
            price: 35,
            imageSrc: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 't-shirts',
            stock: 60,
            color: 'Iso Dots',
            description: 'Artistic design tee.'
        },
        {
            id: 5,
            name: 'Pullover Hoodie',
            price: 55,
            imageSrc: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'hoodies',
            stock: 30,
            color: 'Gray',
            description: 'Warm pullover hoodie.'
        },
        {
            id: 6,
            name: 'Zip-up Jacket',
            price: 75,
            imageSrc: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'jackets',
            stock: 25,
            color: 'Blue',
            description: 'Stylish zip-up jacket.'
        }
    ],
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
        },
        updateProduct: (state, action: PayloadAction<Product>) => {
            const index = state.products.findIndex((p) => p.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
        deleteProduct: (state, action: PayloadAction<number | string>) => {
            state.products = state.products.filter((p) => p.id !== action.payload);
        },
    },
});

export const { addProduct, updateProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
