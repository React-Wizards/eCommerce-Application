import ProductSlider from '@/features/ProductSlider';
import ProductInfo from '@/features/ProductInfo';
import styles from './ProductDetails.module.scss';
import { ProductProjection } from '@commercetools/platform-sdk';

const ProductDetails = (props: { product: ProductProjection }) => {
  return (
    <div className={styles['detailed-container']}>
      <ProductSlider product={props.product} />
      <ProductInfo product={props.product} />
    </div>
  );
};

export default ProductDetails;
