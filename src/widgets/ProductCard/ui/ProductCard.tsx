import { Image, Price, ProductProjection } from '@commercetools/platform-sdk';
import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import {
  defaultCurrencyCode,
  defaultLocale
} from '@/shared/constants/settings';

const ProductCard = (props: { product: ProductProjection }) => {
  const currencySign: { [key: string]: string } = {
    EUR: '€',
    USD: '$',
    RUB: '₽'
  };

  const prices = props.product.masterVariant.prices as Price[];

  const currencyPrice: Price = prices.filter(
    (price: Price) => price.value.currencyCode == defaultCurrencyCode
  )[0];

  type priceValueType = {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };

  const formatPriceString = (priceValue: priceValueType) => {
    return `${currencySign[currencyPrice.value.currencyCode]} ${(
      priceValue.centAmount /
      10 ** priceValue.fractionDigits
    ).toFixed(priceValue.fractionDigits)}`;
  };

  const description = props.product.description;

  const discountPercentage = currencyPrice.discounted
    ? Math.round(
        ((currencyPrice.value.centAmount -
          currencyPrice.discounted.value.centAmount) /
          currencyPrice.value.centAmount) *
          100
      )
    : 0;

  return (
    <div className={styles.productCard}>
      <Link to={`/product/${props.product.key}`}>
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
          {description ? description[defaultLocale] : null}
        </div>
        <div className={styles.productPrice}>
          <div className={styles.actualPrice}>
            {currencyPrice.discounted
              ? formatPriceString(currencyPrice.discounted.value)
              : formatPriceString(currencyPrice.value)}
          </div>
          <div className={styles.oldPrice}>
            {currencyPrice.discounted
              ? formatPriceString(currencyPrice.value)
              : null}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
