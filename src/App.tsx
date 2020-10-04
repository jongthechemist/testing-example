import React from 'react';
import './App.css';
import { ProductCreate } from './ProductCreate';
import { ProductList } from './ProductList';
import { Product } from './types';

function App() {

  const [error, setError] = React.useState<string>('');
  const [newProduct, setNewProduct] = React.useState<Product>();

  return (
    <div className="App">
      <ProductList error={error} newProduct={newProduct}/>
      <ProductCreate onError={setError} onSuccess={setNewProduct}/>
    </div>
  );
}

export default App;
