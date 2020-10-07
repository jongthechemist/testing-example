import React from "react";
import { AxiosError } from "axios";
import { createProduct } from "./product.service";
import { Product } from "./types";
import { useDispatch, useSelector } from "react-redux";
import {
  postProduct,
  ProductPageState,
  showForm as showFormAction,
  updateNewProduct,
} from "./product.redux";

export function ProductCreate(props: {
  onError: (error: string) => void;
  onSuccess: (product: Product) => void;
}) {
  const [showForm, setShowForm] = React.useState<boolean>(false);
  const [code, setCode] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");

  const onSubmit = () => {
    createProduct({ name, code, description })
      .then(() => setShowForm(false))
      .then(() => props.onSuccess({ name, code, description }))
      .catch((error: AxiosError) => {
        props.onError(error.message);
      });
  };

  return (
    <div className="ProductCreate">
      <button onClick={() => setShowForm(true)}>Add Product</button>
      {showForm && (
        <>
          <h1>Product Create</h1>
          <form>
            <label htmlFor="code">Code</label>
            <input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            ></input>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button type="button" onClick={onSubmit}>
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export function ReduxProductCreate() {
  const showForm = useSelector((state: ProductPageState) => state.showForm);
  const newProduct = useSelector((state: ProductPageState) => state.newProduct);
  const dispatch = useDispatch();
  return (
    <div className="ProductCreate">
      <button onClick={() => dispatch(showFormAction())}>Add Product</button>
      {showForm && (
        <>
          <h1>Product Create</h1>
          <form>
            <label htmlFor="code">Code</label>
            <input
              id="code"
              value={newProduct.code}
              onChange={(e) =>
                dispatch(updateNewProduct({ code: e.target.value }))
              }
            ></input>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              value={newProduct.name}
              onChange={(e) =>
                dispatch(updateNewProduct({ name: e.target.value }))
              }
            ></input>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={newProduct.description}
              onChange={(e) =>
                dispatch(updateNewProduct({ description: e.target.value }))
              }
            ></textarea>
            <button
              type="button"
              onClick={() => dispatch(postProduct(newProduct))}
            >
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
}
