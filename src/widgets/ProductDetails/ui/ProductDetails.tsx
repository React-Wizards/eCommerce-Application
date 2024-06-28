import ProductSlider from '@/features/ProductSlider';
import ProductInfo from '@/features/ProductInfo';
import styles from './ProductDetails.module.scss';
import { ProductProjection } from '@commercetools/platform-sdk';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import Loader from '@/shared/Loader';

const ProductDetails = () => {
  const product: ProductProjection = useSelector<RootState, ProductProjection>(
    (store: RootState): ProductProjection => store.selectedProduct.product!
  );

  return product ? (
    <div className={styles['detailed-container']}>
      <ProductSlider />
      <ProductInfo />
    </div>
  ) : (
    <Loader />
  );
};

export default ProductDetails;
