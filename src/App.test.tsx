import React from "react";
import nock, { Scope } from "nock";
import user from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import App from "./App";
import { Product } from "./types";
import { baseURL } from "./product.service";

test("1. User is given ‘Add Product’ option on the product list screen", async () => {
  nock(baseURL).get("/api/products").reply(200, []);
  render(<App />);

  //There's a button labelled 'Add Product'
  expect(await screen.findByText(/Add Product/)).toBeDefined();
});

test("2. Upon clicking ‘Add Product’, user can fill up a form", async () => {
  let nockScope = nock(baseURL).get("/api/products").reply(200, []);
  render(<App />);

  //User click 'Add Product'
  user.click(await screen.findByText(/Add Product/));

  //There's a form with these text fields that user can fill up
  //1. Name
  expect(await screen.findByLabelText(/Name/)).toBeDefined();
  //2. Description
  expect(await screen.findByLabelText(/Description/)).toBeDefined();
  //3. Code
  expect(await screen.findByLabelText(/Code/)).toBeDefined();

  nockScope.done();
});

test("3. User can click ‘Submit’ to add new product", async () => {
  let nockScope = nock(baseURL)
    .get("/api/products")
    .reply(200, [])
    .post("/api/products")
    .reply(201);

  render(<App />);
  //User click 'Add Product'
  user.click(await screen.findByText(/Add Product/));

  //User fills up form
  user.type(await screen.findByLabelText(/Name/), "Product name");
  user.type(await screen.findByLabelText(/Description/), "Product description");
  user.type(await screen.findByLabelText(/Code/), "Product code");

  //There's a submit button that calls API service
  const btnSubmit = await screen.findByText(/Submit/);
  expect(btnSubmit).toBeDefined();
  user.click(btnSubmit);

  setTimeout(() => {
    nockScope.done();
  }, 1000);
});

test("4. On successful submission, product is added to product list", async () => {
  //The product is added to list when API call is successful
  const newProduct: Product = {
    name: "Product A",
    description: "Product description",
    code: "A",
  };

  let nockScope = nock(baseURL)
    .get("/api/products")
    .reply(200, [])
    .post("/api/products")
    .reply(201, "true")
    .get("/api/products")
    .reply(200, [newProduct]);

  render(<App />);

  //User click 'Add Product'
  user.click(await screen.findByText(/Add Product/));

  //User fills up form
  user.type(await screen.findByLabelText(/Name/), newProduct.name);
  user.type(await screen.findByLabelText(/Description/), newProduct.code);
  user.type(await screen.findByLabelText(/Code/), newProduct.description);

  //There's a submit button that calls API service
  user.click(await screen.findByText(/Submit/));

  //The product is added to list when API call is successful
  expect(await screen.findByText(new RegExp(newProduct.name))).toBeDefined();

  nockScope.done();
});

test("5. On failed submission, an error message is shown", async () => {
  //The product is added to list when API call is successful
  const newProduct: Product = {
    name: "Product A",
    description: "Product A description",
    code: "A",
  };
  let nockScope = nock(baseURL)
    .get("/api/products")
    .reply(200, [])
    .post("/api/products")
    .reply(500, "true");

  render(<App />);

  //User click 'Add Product'
  user.click(await screen.findByText(/Add Product/));

  //User fills up form
  user.type(await screen.findByLabelText(/Name/), newProduct.name);
  user.type(await screen.findByLabelText(/Description/), newProduct.code);
  user.type(await screen.findByLabelText(/Code/), newProduct.description);

  //There's a submit button that calls API service
  user.click(await screen.findByText(/Submit/));

  //Error message is shown
  expect(await screen.findByText(/Something went wrong/)).toBeDefined();

  nockScope.done();
});
