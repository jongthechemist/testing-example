import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createProduct, getProducts } from "./product.service";
import { Product } from "./types";

export interface ProductPageState {
  products: Product[];
  showForm: boolean;
  newProduct: Product;
  error: string;
}

let initialState: ProductPageState = {
  products: [],
  showForm: false,
  newProduct: {
    code: "",
    name: "",
    description: "",
  },
  error: ''
};

export const fetchProducts = createAsyncThunk("product/list", getProducts);
export const postProduct = createAsyncThunk(
  "product/create",
  async (product: Product, thunkAPI) => {
    thunkAPI.dispatch(productSlice.actions.hideForm());
    await createProduct(product);
    thunkAPI.dispatch(fetchProducts());
    return true;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    showForm(state) {
      state.showForm = true;
    },
    hideForm(state) {
      state.showForm = false;
    },
    updateNewProduct(state, action: PayloadAction<Partial<Product>>) {
      state.newProduct.code = action.payload.code || state.newProduct.code;
      state.newProduct.name = action.payload.name || state.newProduct.name;
      state.newProduct.description =
        action.payload.description || state.newProduct.description;
    },
  },
  extraReducers: {
    [fetchProducts.fulfilled.type]: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    [fetchProducts.rejected.type]: (state, action: PayloadAction<any>) => {
      state.error = String(action.payload);
    }
  },
});

export const { showForm, hideForm, updateNewProduct } = productSlice.actions;

export const productReducer = productSlice.reducer;

