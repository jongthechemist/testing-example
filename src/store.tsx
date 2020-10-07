import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./product.redux";
import { Provider } from "react-redux";

const store = configureStore({ reducer: productReducer });

export function ProductProvider(props: any) {
  return <Provider store={store} {...props}></Provider>;
}
