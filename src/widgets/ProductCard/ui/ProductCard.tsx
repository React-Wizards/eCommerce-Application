import { Image, ProductProjection } from '@commercetools/platform-sdk';
import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import {
  defaultCurrencyCode,
  defaultLocale
} from '@/shared/constants/settings';
import {
  formatPriceString,
  getDiscountFromPrice,
  getPriceFromProduct
} from '@/shared/utils';

const ProductCard = (props: { product: ProductProjection }) => {
  const currencyPrice = getPriceFromProduct(props.product, defaultCurrencyCode);
  const discountPercentage = getDiscountFromPrice(currencyPrice);

  return (
    <div className={styles.productCard}>
      <Link to={`/home/product/${props.product.key}`}>
        <div className={styles.imageContainer}>
          <img
            alt='product image'
            className={styles.productImage}
            src={(props.product.masterVariant.images as Image[])[0].url}></img>
          {discountPercentage ? (
            <div
              className={styles.discount}>{`${discountPercentage}% off`}</div>
          ) : null}
        </div>
        <div className={styles.productName}>
          {props.product.name[defaultLocale]}
        </div>
        <div className={styles.productDescription}>
          {props.product.description &&
            props.product.description[defaultLocale]}
        </div>
        <div className={styles.productPrice}>
          <div className={styles.actualPrice}>
            {currencyPrice?.discounted
              ? formatPriceString(currencyPrice?.discounted.value)
              : formatPriceString(currencyPrice?.value)}
          </div>
          <div className={styles.oldPrice}>
            {currencyPrice?.discounted
              ? formatPriceString(currencyPrice.value)
              : null}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
