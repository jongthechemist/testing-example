import React from 'react'
import { getProducts } from './product.service';
import { Product } from './types';

export function ProductList(props: {
    error: string,
    newProduct?: Product
}) {
    const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    getProducts().then(setProducts);
  }, [props.newProduct]);


  return (
    <div>
      <h1>Product List</h1>
      {
        props.error && <h2>Something went wrong: {props.error}</h2>
      }
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