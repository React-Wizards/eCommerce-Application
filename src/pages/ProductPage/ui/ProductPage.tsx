import homeStyles from '@/pages/Home/ui/Home.module.scss';
import Breadcrumbs from '@/features/Breadcrumbs';
import { useNavigate, useParams } from 'react-router-dom';
import type { ProductProjection } from '@commercetools/platform-sdk';
import { useAppSelector, type RootState } from '@/app/store';
import { useEffect, useState } from 'react';
import ProductDetails from '@/widgets/ProductDetails';
import { useGetProductByKeyMutation } from '@/features/api/appApi';
import Loader from '@/shared/Loader';
import Header from '@/features/Header';
import { setCart } from '@/entities/cart';
import { Cart } from '@commercetools/platform-sdk';
import {
  useGetActiveCartMutation,
  useCreateActiveCartMutation
} from '@/features/api/meApi';
import { useDispatch } from 'react-redux';

const ProductPage = () => {
  const { productKey } = useParams();
  const products: ProductProjection[] = useAppSelector<
    RootState,
    ProductProjection[]
  >((state: RootState): ProductProjection[] => state.products.products);
  const [product, setProduct] = useState<ProductProjection>();

  const [requestProduct, { isLoading }] = useGetProductByKeyMutation();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [requestCart] = useGetActiveCartMutation();
  const [createCart] = useCreateActiveCartMutation();

  useEffect(() => {
    async function fetchData() {
      try {
        const result: ProductProjection = await requestProduct(
          String(productKey)
        ).unwrap();
        setProduct(result);
      } catch {
        navigate('NotFound');
      }
    }

    const filtredProducts = products.filter((prod) => {
      prod.key === productKey;
    });

    if (filtredProducts.length) {
      setProduct(filtredProducts[0]);
    } else {
      fetchData();
    }

    async function fetchActiveCart() {
      try {
        const activeCart: Cart = await requestCart().unwrap();
        dispatch(setCart(activeCart));
      } catch (error: unknown) {
        if (
          typeof error === 'object' &&
          error &&
          'status' in error &&
          error.status === 404
        ) {
          const newCart: Cart = await createCart().unwrap();
          dispatch(setCart(newCart));
        }
      }
    }

    fetchActiveCart();
  }, [navigate, productKey, products, requestProduct, requestCart, createCart]);

  if (!product || isLoading) {
    return <Loader />;
  }

  return (
    <div className={homeStyles.container}>
      <Header />
      <Breadcrumbs />
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductPage;
