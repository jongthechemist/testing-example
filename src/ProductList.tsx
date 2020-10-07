import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./product.service";
import { Product } from "./types";
import { fetchProducts, ProductPageState } from "./product.redux";

export function ProductList(props: { error: string; newProduct?: Product }) {
  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    getProducts().then(setProducts);
  }, [props.newProduct]);

  return (
    <div>
      <h1>Product List</h1>
      {props.error && <h2>Something went wrong: {props.error}</h2>}
      <ul>
        {products.map((product) => (
          <li key={product.code}>
            <strong>{product.name} : </strong>
            {product.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ReduxProductList() {
  const products = useSelector((state: ProductPageState) => state.products);
  const error = useSelector((state: ProductPageState) => state.error);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Product List</h1>
      {error && <h2>Something went wrong: {error}</h2>}
      <ul>
        {products.map((product) => (
          <li key={product.code}>
            <strong>{product.name} : </strong>
            {product.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
