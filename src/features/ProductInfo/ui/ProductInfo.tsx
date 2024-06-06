import styles from './ProductInfo.module.scss';
import { useAppSelector } from '@/app/store';
import {
  defaultCurrencyCode,
  defaultLocale
} from '@/shared/constants/settings';
import { Price } from '@commercetools/platform-sdk';

const ProductInfo = () => {
  const product = useAppSelector((state) => state.selectedProduct.product);

  const currencySign: { [key: string]: string } = {
    EUR: '€',
    USD: '$',
    RUB: '₽'
  };

  const prices = product?.masterVariant.prices as Price[];

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

  return (
    <div className={styles.container}>
      <div className={styles['product-header']}>
        <h1 className={styles['product-title']}>
          {product?.name[defaultLocale]}
        </h1>
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
      </div>
      <div>
        <h3 className={styles['product-subtitle']}>Short description:</h3>
        <p className={styles['product-description']}>
          {product?.description ? product.description[defaultLocale] : null}
        </p>
      </div>
      <div>
        <h3 className={styles['product-subtitle']}>Size:</h3>
        <div className={styles['size-btns']}>
          <button className={styles['size-btn']}>S</button>
          <button className={styles['size-btn']}>M</button>
          <button className={styles['size-btn']}>L</button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
