import homeStyles from '@/pages/Home/ui/Home.module.scss';
import Breadcrumbs from '@/features/Breadcrumbs';
import { useNavigate, useParams } from 'react-router-dom';
import type { Customer, ProductProjection } from '@commercetools/platform-sdk';
import { useSelector } from 'react-redux';
import { useAppSelector, type RootState } from '@/app/store';
import { useEffect, useState } from 'react';
import ProductDetails from '@/widgets/ProductDetails';
import { useGetProductByKeyMutation } from '@/features/api/appApi';
import Loader from '@/shared/Loader';
import Header from '@/features/Header';

const ProductPage = () => {
  const { productKey } = useParams();
  const customer: Customer | null = useSelector<RootState, Customer | null>(
    (store: RootState): Customer | null => store.customer.user
  );

  const products: ProductProjection[] = useAppSelector<
    RootState,
    ProductProjection[]
  >((state: RootState): ProductProjection[] => state.products.products);
  const [product, setProduct] = useState<ProductProjection>();

  const [requestProduct, { isLoading }] = useGetProductByKeyMutation();

  const navigate = useNavigate();

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
  }, [navigate, productKey, products, requestProduct]);

  if (!product || isLoading) {
    return <Loader />;
  }

  return (
    <div className={homeStyles.container}>
      <Header customer={customer} />
      <Breadcrumbs />
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductPage;
