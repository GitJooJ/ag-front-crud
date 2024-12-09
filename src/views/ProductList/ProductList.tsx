import { useEffect, useMemo, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { Header } from '../../components/Header/Header';
import { Loading } from '../../components/Loading/Loading';
import { deleteProduct, Product } from '../../repositories/productRepository';
import { getProducts } from '../../services/productService';
import './ProductList.css';

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
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


  // O useMemo é um hook do React que permite memorizar o valor de uma variável, evitando que ela seja recalculada a cada renderização do componente.
  // No caso de uma tabela paginada, o useMemo garante que a lista de produtos exibidos seja recalculada apenas quando os dados dos produtos 
  // ou o número da pagina mudar, o que evita cálculos desnecessários a cada re - renderização do componente e 
  // otimiza a performance da aplicação, especialmente em listas com um grande número de items. 
  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return products.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [products, currentPage, productsPerPage]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(products.length / productsPerPage);

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
    return <Loading />
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
        <div className={'list-container'}>
          <table className={'table'}>
            <thead>
              <tr>
                <th>Nome</th>
                <th className={'price'}>Preço</th>
                <th className={'description'}>Descrição</th>
                <th className={'actions'}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>R$ {product.price}</td>
                  <td className={'description'}>{product.description}</td>
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
          {totalPages >= 2 && <div className="pagination">
            <button onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}>
              <FaChevronLeft size={'1rem'} />
            </button>
            <span>{currentPage} de {totalPages}</span>
            <button onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}>
              <FaChevronRight size={'1rem'} />
            </button>
          </div>}
        </div>
      )}
    </div>
  )
};