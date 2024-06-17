import type { RootState } from '@/app/store';
import type { ProductProjection } from '@commercetools/platform-sdk';
import ProductSlider from '@/features/ProductSlider';
import ProductInfo from '@/features/ProductInfo';
import { useSelector } from 'react-redux';
import styles from './DetailedProduct.module.scss';

const DetailedProduct = () => {
  const product = useSelector<RootState, ProductProjection>(
    (store: RootState): ProductProjection => store.selectedProduct.product!
  );

  return (
    <div className={styles['detailed-container']}>
      <ProductSlider product={product} />
      <ProductInfo product={product} />
    </div>
  );
};

export default DetailedProduct;
