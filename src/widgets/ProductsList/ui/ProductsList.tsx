import type { ProductProjection } from '@commercetools/platform-sdk';
import ProductCard from '@/widgets/ProductCard';
import { type RootState, useAppSelector } from '@/app/store';
import styles from './ProductsList.module.scss';

const ProductsList = () => {
  const products: ProductProjection[] = useAppSelector<
    RootState,
    ProductProjection[]
  >((state: RootState): ProductProjection[] => state.products.products);

  return (
    <div className={styles.productsList}>
      {products.length ? (
        products.map((product: ProductProjection) => (
          <ProductCard key={product.id} product={product}></ProductCard>
        ))
      ) : (
        <div className={styles.placeHolder}>
          There are no matching products...
        </div>
      )}
    </div>
  );
};

export default ProductsList;
