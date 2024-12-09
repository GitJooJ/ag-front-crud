import { deleteProduct, fetchProductById, fetchProducts, Product, saveProduct, updateProduct } from '../repositories/productRepository';

interface ValidationResult {
  isValid: boolean;
  errors: {
    name?: string;
    price?: string;
    description?: string;
  };
};

export function validateProduct(product: Product): ValidationResult {
  const errors: ValidationResult['errors'] = {};

  if (product.name.trim() === '') {
    errors.name = 'Insira um nome válido';
  }

  if (typeof product.price !== 'number' || product.price <= 0) {
    errors.price = 'Insira um preço válido';
  }

  if (product.description.trim() === '') {
    errors.description = 'Insira uma descrição válida';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export const createProduct = async (product: Product) => {
  try {
    if (product.price <= 0 || isNaN(product.price)) {
      throw new Error('Preço inválido');
    }
    await saveProduct(product);
  } catch (error) {
    throw new Error('Erro ao criar produto: ' + error);
  }
};

export const updateExistingProduct = async (product: Product) => {
  try {
    if (product.price <= 0 || isNaN(product.price)) {
      throw new Error('Preço inválido');
    }
    await updateProduct(product);
  } catch (error) {
    throw new Error('Erro ao atualizar produto: ' + error);
  }
};

export const getProducts = async () => {
  try {
    const products = await fetchProducts();
    return products;
  } catch (error) {
    throw new Error('Erro ao buscar produtos: ' + error);
  };
};

export const getProductsById = async (id: number): Promise<Product | null> => {
  try {
    return await fetchProductById(id);
  } catch (error) {
    throw new Error('Erro ao buscar produto: ' + error);
  }
};


export const deleteExistingProduct = async (id: number) => {
  try {
    await deleteProduct(id);
  } catch (error) {
    throw new Error('Erro ao deletar produto: ' + error);
  };
};