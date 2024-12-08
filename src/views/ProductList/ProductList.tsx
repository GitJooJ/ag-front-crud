import { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { Header } from '../../components/Header/Header';
import { deleteProduct, Product } from '../../repositories/productRepository';
import { getProducts } from '../../services/productService';
import './ProductList.css';

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        setError('Ocorreu um erro ao buscar os produtos' + error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (product: Product) => {
    navigate(`/cadastro/${product.id}`);
  }

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('Deseja realmente excluir este produto permanentemente?');
    if (confirmDelete) {
      try {
        await deleteProduct(id);
        setProducts(products.filter((product) => product.id !== id));
        alert('Produto excluído com sucesso!');
      } catch (error) {
        alert('Ocorreu um erro ao excluir o produto' + error);
        console.error(error);
      }
    }

  }

  if (loading) {
    return <div>Carregando...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <Header title='Listagem de Produtos' />
      {products.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <table className={'table'}>
          <thead>
            <tr>
              <th>Nome</th>
              <th className={'price'}>Preço</th>
              <th>Descrição</th>
              <th className='actions'>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>R$ {product.price}</td>
                <td>{product.description}</td>
                <td>
                  <button onClick={() => handleEdit(product)}>
                    <MdEdit size={'20px'} />
                  </button>
                  <button onClick={() => handleDelete(product.id as number)}>
                    <MdDelete size={'20px'} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
};