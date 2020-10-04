import { Product } from "./types";
import Axios from "axios";

export const baseURL = 'https://run.mocky.io/v3/21e78699-d36e-4e13-a9fd-8b5ab8fafa8e'
Axios.defaults.baseURL = baseURL;

export function getProducts(): Promise<Product[]> {
  return Axios.get<Product[]>("/api/products").then((response) => response.data);
}

export function createProduct(product: Product): Promise<boolean> {
  return Axios.post<boolean>("/api/products", product).then(
    (response) => response.data
  );
}
