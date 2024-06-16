import { Cart, ProductProjection } from '@commercetools/platform-sdk';
import styles from './ProductsList.module.scss';
import ProductCard from '@/widgets/ProductCard';
import { Customer } from '@commercetools/platform-sdk';

const ProductsList = (props: {
  products: Array<ProductProjection>;
  customer: Customer | null;
  cart: Cart | null;
}) => {
  return (
    <div className={styles.productsList}>
      {props.products.length ? (
        props.products.map((product) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              customer={props.customer}
              cart={props.cart}></ProductCard>
          );
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
