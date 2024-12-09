import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button } from '../../components/Button/Button';
import { Header } from '../../components/Header/Header';
import { Loading } from '../../components/Loading/Loading';
import { TextField } from '../../components/Textfield/Textfield';
import { createProduct, getProductsById, updateExistingProduct, validateProduct } from '../../services/productService';
import './ProductForm.css';

interface Errors {
  name?: string;
  price?: string;
  description?: string;
}

export const ProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: '', price: 0, priceDisplay: 'R$ 0,00', description: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        setLoading(true);
        try {
          const productData = await getProductsById(Number(id));
          if (productData) {
            const productPriceNumber = +productData.price;
            setProduct({
              name: productData.name,
              price: productPriceNumber,
              priceDisplay: productPriceNumber.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
              description: productData.description,
            });
          } else {
            alert('Produto não encontrado');
            navigate('/');
          }
        } catch {
          alert('Erro ao buscar produto');
          navigate('/');
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const [errors, setErrors] = useState<Errors>({});
  const [creating, setCreating] = useState<boolean>(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, name: e.target.value });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    const numericValue = parseFloat(rawValue) / 100;

    setProduct({
      ...product,
      priceDisplay: numericValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      price: numericValue,
    });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, description: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { isValid, errors } = validateProduct({
      ...product,
      price: product.price,
    });

    if (!isValid) {
      setErrors(errors);
      return;
    }

    try {
      setCreating(true);
      const payload = { name: product.name, price: product.price, description: product.description };
      if (id) {
        await updateExistingProduct({ ...payload, id: Number(id) });
        alert('Produto atualizado com sucesso!');
      } else {
        await createProduct(product);
        alert('Produto cadastrado com sucesso!');
        setProduct({ name: '', price: 0, priceDisplay: 'R$ 0,00', description: '' });
        setErrors({});
      }
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      alert('Erro ao cadastrar produto. Tente novamente mais tarde.');
      setCreating(false);
    } finally {
      setCreating(false);
      navigate('/');
    }

  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={'page-container'}>
      <Header title='Cadastro de Produtos' />
      <div className={'form-container'}>
        <form className='form' onSubmit={handleSubmit}>
          <div className='responsive-row'>
            <TextField label='Nome' growth={4} value={product.name} onChange={handleNameChange} error={errors.name} />
            <TextField label='Preço' growth={1} value={product.priceDisplay} onChange={handlePriceChange} error={errors.price} />
          </div>
          <TextField label='Descrição' value={product.description} onChange={handleDescriptionChange} error={errors.description} />
          <Button type='submit' disabled={creating}>{id ? 'Atualizar Produto' : 'Cadastrar Produto'}</Button>
        </form>
      </div>
    </div>
  );
};