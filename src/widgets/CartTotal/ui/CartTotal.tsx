import type { Cart, LineItem } from '@commercetools/platform-sdk';
import { useSelector } from 'react-redux';
import { type ChangeEvent, useState } from 'react';
import type { RootState } from '@/app/store';
import { formatPriceString } from '@/shared/utils';
import Loader from '@/shared/Loader';
import { useAddDiscountCodeMutation } from '@/features/api/meApi';
import styles from './CartTotal.module.scss';
import { setCart } from '@/entities/cart';
import { useDispatch } from 'react-redux';

const CartTotal = () => {
  const cart: Cart = useSelector<RootState, Cart>(
    (store: RootState): Cart => store.cart.cart!
  );
  const total: string = formatPriceString(cart.totalPrice)!;
  const subtotal: string = formatPriceString({
    type: 'centPrecision',
    centAmount: cart.lineItems.reduce(
      (sum: number, lineItem: LineItem): number =>
        sum + lineItem.price.value.centAmount * lineItem.quantity,
      0
    ),
    currencyCode: 'USD',
    fractionDigits: 2
  })!;
  const discount: string =
    (
      Number(subtotal.slice(1)) -
      (Number(total.slice(1)) +
        (Number(
          formatPriceString(cart.discountOnTotalPrice?.discountedAmount)?.slice(
            1
          )
        ) || 0))
    ).toFixed(2) || '00.00';
  const couponDiscount: string =
    formatPriceString(cart.discountOnTotalPrice?.discountedAmount) || '0.00';
  const [addDiscountCode, { isLoading }] = useAddDiscountCodeMutation();
  const dispatch = useDispatch();
  const [code, setCode] = useState<string>('');

  return (
    <div className={styles.wrapper}>
      {isLoading && <Loader />}
      <p className={styles.title}>Cart Totals</p>
      <hr className={styles.divider} />
      <p className={styles.description}>Coupon Apply</p>
      <div className={styles.coupon}>
        <input
          className={styles.coupon__input}
          type='text'
          placeholder='Enter coupon code here...'
          onChange={(event: ChangeEvent<HTMLInputElement>): void => {
            setCode(event.target.value);
          }}
        />
        <button
          className={styles.coupon__apply}
          onClick={(): void => {
            const fetchCode = async (): Promise<void> => {
              dispatch(
                setCart(
                  await addDiscountCode({
                    cartId: cart.id,
                    cartVersion: cart.version,
                    code
                  }).unwrap()
                )
              );
            };

            fetchCode();
          }}>
          Apply
        </button>
      </div>
      <div className={styles.info}>
        <div className={styles.subtotal}>
          <span className={styles.subtotal__text}>Subtotal</span>
          <span className={styles.subtotal__price}>{subtotal}</span>
        </div>
        <div className={styles.discount}>
          <span className={styles.discount__text}>Discount</span>
          <span className={styles.discount__price}>{`(-) $${discount}`}</span>
        </div>
        <div className={styles['coupon-discount']}>
          <span className={styles['coupon-discount__text']}>
            Coupon Discount
          </span>
          <span
            className={
              styles['coupon-discount__price']
            }>{`(-) ${couponDiscount}`}</span>
        </div>
        <div className={styles.total}>
          <span className={styles.total__text}>Total</span>
          <span className={styles.total__price}>{total}</span>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
