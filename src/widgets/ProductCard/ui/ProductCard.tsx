import { Price, ProductProjection } from '@commercetools/platform-sdk';
import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import {
  defaultCurrencyCode,
  defaultLocale
} from '@/shared/constants/settings';
import Button from '@/shared/Button';
import type { Customer, LineItem } from '@commercetools/platform-sdk';
import { useAddProductToCartMutation } from '@/features/api/meApi';
import { Cart } from '@commercetools/platform-sdk';
import Loader from '@/shared/Loader';
import { useSelector } from 'react-redux';
import { useAppSelector, type RootState } from '@/app/store';
import { setCart } from '@/entities/cart';
import { useDispatch } from 'react-redux';

type priceValueType = {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
};

const ProductCard = ({ product }: { product: ProductProjection }) => {
  const customer: Customer | null = useSelector<RootState, Customer | null>(
    (store: RootState) => store.customer.user
  );
  const cart: Cart | null = useAppSelector<RootState, Cart | null>(
    (state: RootState): Cart | null => state.cart.cart
  );
  const dispatch = useDispatch();
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
  const [addProductToCart, { isLoading }] = useAddProductToCartMutation();
  const hasInCart: boolean =
    cart?.lineItems.some(
      (cartItem: LineItem): boolean => cartItem.productId === product.id
    ) || false;

  const addToCart = async (): Promise<void> => {
    if (!cart || hasInCart) {
      return;
    }

    dispatch(
      setCart(
        await addProductToCart({
          cartVersion: cart.version,
          cartId: cart.id,
          productId: product.id,
          quantity: 1
        }).unwrap()
      )
    );
  };

  return (
    <>
      {isLoading && <Loader />}
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
          <div className={styles.productName}>
            {product.name[defaultLocale]}
          </div>
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
        {customer && (
          <Button
            text={!hasInCart ? 'Add to cart' : 'Added to cart'}
            disabled={hasInCart}
            callback={() => {
              addToCart();
            }}
          />
        )}
      </div>
    </>
  );
};

export default ProductCard;
