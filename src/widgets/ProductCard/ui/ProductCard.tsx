import { Image, Price, ProductProjection } from '@commercetools/platform-sdk';
import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import {
  defaultCurrencyCode,
  defaultLocale
} from '@/shared/constants/settings';
import Button from '@/shared/Button';
import type { Customer } from '@commercetools/platform-sdk';
import { useAddProductToCartMutation } from '@/features/api/meApi';
import { Cart } from '@commercetools/platform-sdk';
import Loader from '@/shared/Loader';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppSelector, type RootState } from '@/app/store';

const ProductCard = ({ product }: { product: ProductProjection }) => {
  const customer: Customer | null = useSelector<RootState, Customer | null>(
    (store: RootState) => store.customer.user
  );
  const cart: Cart | null = useAppSelector<RootState, Cart | null>(
    (state: RootState): Cart | null => state.cart.cart
  );

  const currencySign: { [key: string]: string } = {
    EUR: '€',
    USD: '$',
    RUB: '₽'
  };

  const prices = product.masterVariant.prices as Price[];

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

  const discountPercentage = currencyPrice.discounted
    ? Math.round(
        ((currencyPrice.value.centAmount -
          currencyPrice.discounted.value.centAmount) /
          currencyPrice.value.centAmount) *
          100
      )
    : 0;

  const [addProductToCart, { isLoading }] = useAddProductToCartMutation();
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const addToCart = async (selectedProductId: string): Promise<void> => {
    if (cart) {
      const productInCart = cart?.lineItems.filter(
        (item) => item.productId === selectedProductId
      );
      if (productInCart.length === 0) {
        await addProductToCart({
          cartVersion: cart.version,
          cartId: cart.id,
          productId: selectedProductId,
          quantity: 1
        });
      }
    }
  };

  return (
    <div className={styles.productCard}>
      {isLoading ? <Loader /> : null}
      <Link to={`/product/${product.key}`}>
        <div className={styles.imageContainer}>
          <img
            alt='product image'
            className={styles.productImage}
            src={(product.masterVariant.images as Image[])[0].url}></img>
          {discountPercentage ? (
            <div
              className={styles.discount}>{`${discountPercentage}% off`}</div>
          ) : null}
        </div>
        <div className={styles.productName}>{product.name[defaultLocale]}</div>
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
      {customer && (
        <Button
          text={
            !isClicked &&
            cart?.lineItems.filter((item) => item.productId === product.id)
              .length === 0
              ? 'Add to cart'
              : 'Added to cart'
          }
          disabled={
            isClicked ||
            !(
              cart?.lineItems.filter((item) => item.productId === product.id)
                .length === 0
            )
              ? true
              : false
          }
          callback={() => {
            setIsClicked(true);
            addToCart(product.id);
          }}
        />
      )}
    </div>
  );
};

export default ProductCard;
