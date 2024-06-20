import ProductSlider from '@/features/ProductSlider';
import ProductInfo from '@/features/ProductInfo';
import styles from './DetailedProduct.module.scss';

const DetailedProduct = () => {
  return (
    <div className={styles['detailed-container']}>
      <ProductSlider />
      <ProductInfo />
    </div>
  );
};

export default DetailedProduct;
