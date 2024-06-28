import { Price, ProductProjection } from '@commercetools/platform-sdk';
import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import {
  defaultCurrencyCode,
  defaultLocale
} from '@/shared/constants/settings';
import ToggleProductInCart from '@/features/ToggleProductInCart';

type priceValueType = {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
};
const ProductCard = ({ product }: { product: ProductProjection }) => {
  const currencySign: { [key: string]: string } = {
    EUR: '€',
    USD: '$',
    RUB: '₽'
  };
  const prices: Price[] = product.masterVariant.prices!;
  const currencyPrice: Price = prices.find(
    (price: Price) => price.value.currencyCode == defaultCurrencyCode
  )!;
  const formatPriceString = (priceValue: priceValueType) => {
    return `${currencySign[currencyPrice.value.currencyCode]} ${(
      priceValue.centAmount /
      10 ** priceValue.fractionDigits
    ).toFixed(priceValue.fractionDigits)}`;
  };
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
      <Link to={`/product/${product.key}`}>
        <div className={styles.imageContainer}>
          <img
            alt={product.name['en-US']}
            className={styles.productImage}
            src={product.masterVariant.images![0].url}></img>
          {discountPercentage ? (
            <div
              className={styles.discount}>{`${discountPercentage}% off`}</div>
          ) : null}
        </div>
        <div className={styles.productName}>{product.name[defaultLocale]}</div>
        <div className={styles.productPrice}>
          <div className={styles.actualPrice}>
            {formatPriceString(
              currencyPrice.discounted
                ? currencyPrice.discounted.value
                : currencyPrice.value
            )}
          </div>
          <div className={styles.oldPrice}>
            {currencyPrice.discounted
              ? formatPriceString(currencyPrice.value)
              : null}
          </div>
        </div>
      </Link>
      <ToggleProductInCart product={product} />
    </div>
  );
};

export default ProductCard;
