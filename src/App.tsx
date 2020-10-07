import React from 'react';
import './App.css';
import { ProductCreate, ReduxProductCreate } from './ProductCreate';
import { ProductList, ReduxProductList } from './ProductList';
import { ProductProvider } from './store';
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

function ReduxApp() {
  return (
    <ProductProvider>
      <ReduxProductList/>
      <ReduxProductCreate/>
    </ProductProvider>
  )
}

export default App;
