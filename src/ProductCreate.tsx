import React from "react";
import { AxiosError } from "axios";
import { createProduct } from "./product.service";
import { Product } from "./types";

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
          <form onSubmit={onSubmit}>
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
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </div>
  );
}
