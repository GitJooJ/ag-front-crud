import axios from 'axios';

const API_URL = 'http://localhost:3000/products';

export interface Product {
  id?: number;
  name: string;
  price: number;
  description: string;
};

export const saveProduct = async (product: Product) => {
  return axios.post(API_URL, product);
};

export const fetchProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchProductById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateProduct = async (product: Product) => {
  return axios.put(`${API_URL}/${product.id}`, product);
};

export const deleteProduct = async (id: number) => {
  return axios.delete(`${API_URL}/${id}`);
};