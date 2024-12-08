import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button } from '../../components/Button/Button';
import { Header } from '../../components/Header/Header';
import { TextField } from '../../components/Textfield/Textfield';
import { createProduct, getProductsById, updateExistingProduct, validateProduct } from '../../services/productService';
import { formatCurrency } from '../../utils/formatCurrency';
import './ProductForm.css';

interface Errors {
  name?: string;
  price?: string;
  description?: string;
}

export const ProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: '', price: '', description: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        setLoading(true);
        try {
          const productData = await getProductsById(Number(id));
          if (productData) {
            setProduct({ name: productData.name, price: productData.price.toString(), description: productData.description });
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
    const rawValue = e.target.value.replace(/[^\d,.-]/g, '').replace(',', '.');
    setProduct({ ...product, price: rawValue });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, description: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { isValid, errors } = validateProduct({
      name: product.name,
      price: parseFloat(product.price),
      description: product.description
    });

    if (!isValid) {
      setErrors(errors);
      return;
    }

    const priceNumber = parseFloat(product.price.replace(',', '.'));
    if (isNaN(priceNumber) || priceNumber <= 0) {
      setErrors({ price: 'Insira um preço válido' });
      return;
    }

    try {
      setCreating(true);
      const productData = { ...product, price: priceNumber };
      if (id) {
        await updateExistingProduct(productData);
        alert('Produto atualizado com sucesso!');
      } else {
        await createProduct(productData);
        alert('Produto cadastrado com sucesso!');
        setProduct({ name: '', price: '', description: '' });
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
    return <div>Carregando...</div>;
  }

  return (
    <div className={'form-container'}>
      <Header title='Cadastro de Produtos' />
      <form className='form' onSubmit={handleSubmit}>
        <div className='responsive-row'>
          <TextField label='Nome' growth={4} value={product.name} onChange={handleNameChange} error={errors.name} />
          <TextField label='Preço' growth={1} value={product.price ? formatCurrency(product.price) : 'R$ 0,00'} onChange={handlePriceChange} error={errors.price} />
        </div>
        <TextField label='Descrição' value={product.description} onChange={handleDescriptionChange} error={errors.description} />
        <Button type='submit' disabled={creating}>Cadastrar Produto</Button>
      </form>
    </div>
  );
};