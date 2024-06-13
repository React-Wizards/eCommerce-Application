import { ProductProjection } from '@commercetools/platform-sdk';
import styles from './ProductsList.module.scss';
import ProductCard from '@/widgets/ProductCard';

const ProductsList = (props: { products: Array<ProductProjection> }) => {
  return (
    <div className={styles.productsList}>
      {props.products.length ? (
        props.products.map((product) => {
          return <ProductCard key={product.id} product={product}></ProductCard>;
        })
      ) : (
        <div className={styles.placeHolder}>
          There are no matching products...
        </div>
      )}
    </div>
  );
};

export default ProductsList;
