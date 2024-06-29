import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { ProductProjection } from '@commercetools/platform-sdk';
import type { Cart } from '@commercetools/platform-sdk';
import { useAppSelector, type RootState } from '@/app/store';
import Loader from '@/shared/Loader';
import ProductDetails from '@/widgets/ProductDetails';
import Breadcrumbs from '@/features/Breadcrumbs';
import { useGetProductByKeyMutation } from '@/features/api/appApi';
import Header from '@/features/Header';
import { setCart } from '@/entities/cart';
import {
  useGetActiveCartMutation,
  useCreateActiveCartMutation
} from '@/features/api/meApi';
import { setProduct } from '@/entities/selectedProduct';

const ProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productKey } = useParams();
  const products: ProductProjection[] = useAppSelector<
    RootState,
    ProductProjection[]
  >((state: RootState): ProductProjection[] => state.products.products);
  const [requestProduct, { isLoading }] = useGetProductByKeyMutation();
  const [getCart] = useGetActiveCartMutation();
  const [createCart] = useCreateActiveCartMutation();

  useEffect(() => {
    async function fetchData() {
      try {
        const result: ProductProjection = await requestProduct(
          productKey || ''
        ).unwrap();

        dispatch(setProduct(result));
      } catch {
        navigate('NotFound');
      }
    }

    const filtredProduct: ProductProjection | undefined = products.find(
      ({ key }: ProductProjection): boolean => key === productKey
    );

    if (filtredProduct) {
      dispatch(setProduct(filtredProduct));
    } else {
      fetchData();
    }

    async function fetchActiveCart() {
      try {
        const activeCart: Cart = await getCart().unwrap();
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
  }, [navigate, productKey, products, requestProduct, getCart, createCart]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <Breadcrumbs />
      <ProductDetails />
    </>
  );
};

export default ProductPage;
