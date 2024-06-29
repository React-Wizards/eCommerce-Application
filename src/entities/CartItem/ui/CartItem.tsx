import { type ChangeEvent, useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import type { Cart, LineItem } from '@commercetools/platform-sdk';
import imageNotFound from '@/shared/assets/img/cart-image-not-found.jpg';
import {
  useAddProductToCartMutation,
  useDeleteProductFromCartMutation,
  useRecalculateMutation
} from '@/features/api/meApi';
import { setCart } from '@/entities/cart';
import { useDispatch } from 'react-redux';
import Loader from '@/shared/Loader';
import { useDebounce } from '@/shared/useDebounce';
import { FaRegTrashCan } from 'react-icons/fa6';
import styles from './CartItem.module.scss';
import { formatPriceString } from '@/shared/utils';

interface IProps {
  lineItem: LineItem;
}

interface IRequestInfo {
  cartId: string;
  cartVersion: number;
}

const CartItem = ({ lineItem }: IProps) => {
  const [quantity, setquantity] = useState<number>(lineItem.quantity);
  const debouncedQuantity: number = useDebounce<number>(quantity, 400);
  const [addProductToCart, { isLoading: addProductIsLoading }] =
    useAddProductToCartMutation();
  const [deleteProductFromCart, { isLoading: deleteProductIsLoading }] =
    useDeleteProductFromCartMutation();
  const [recalculate, { isLoading: recalculateIsLoading }] =
    useRecalculateMutation();
  const urlToImage: string = lineItem.variant.images?.[0].url || imageNotFound;
  const name: string = lineItem.name['en-US'];
  const cart: Cart = useSelector<RootState, Cart>(
    (store: RootState): Cart => store.cart.cart!
  );
  const dispatch = useDispatch();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (debouncedQuantity === lineItem.quantity) {
      return;
    }

    const fetchCart = async (): Promise<void> => {
      const requestInfo: IRequestInfo = {
        cartId: cart.id,
        cartVersion: cart.version
      };
      const newQuantity: number = Math.abs(
        debouncedQuantity - lineItem.quantity
      );

      try {
        const newCart: Cart = await (
          debouncedQuantity > lineItem.quantity
            ? addProductToCart({
                ...requestInfo,
                productId: lineItem.productId,
                quantity: newQuantity
              })
            : deleteProductFromCart({
                ...requestInfo,
                lineItemId: lineItem.id,
                lineItemQuantity: newQuantity
              })
        ).unwrap();

        dispatch(
          setCart(
            await recalculate({
              cartId: newCart.id,
              cartVersion: newCart.version
            }).unwrap()
          )
        );
      } catch (error: unknown) {
        console.error(error);
      }
    };

    fetchCart();
  }, [debouncedQuantity]);

  return (
    <tr className={styles.row}>
      <td className={styles.cell}>
        {(addProductIsLoading ||
          deleteProductIsLoading ||
          recalculateIsLoading) && <Loader />}
        <div className={styles.wrapper}>
          <img className={styles.image} src={urlToImage} alt={name} />
          <div className={styles.info}>
            <span className={styles.info__text} title={name}>
              {name}
            </span>
          </div>
        </div>
      </td>
      <td className={styles.cell}>
        <div className={styles.cell__wrapper}>
          <span
            className={`${styles.cell__price} ${lineItem.price.discounted ? styles.cell__price_discounted : ''}`}
          >
            {formatPriceString(lineItem.price.value)}
          </span>
          {lineItem.price.discounted && (
            <span className={`${styles.cell__price}`}>
              {formatPriceString(lineItem.price.discounted.value)}
            </span>
          )}
        </div>
      </td>
      <td className={`${styles.cell} ${styles.cell__quantity}`}>
        <button
          className={styles.button}
          onClick={() => {
            setquantity((prev: number): number => Math.max(0, prev - 1));
          }}
        >
          <span className={styles.button__text}>-</span>
        </button>
        <input
          className={styles.quantity}
          type='number'
          min='1'
          max='999'
          minLength={1}
          value={quantity}
          pattern='[1-9][0-9]*'
          onChange={(event: ChangeEvent<HTMLInputElement>): void => {
            setquantity(Number(event.target.value));
          }}
        />
        <button
          className={styles.button}
          onClick={() => {
            setquantity((prev: number): number => prev + 1);
          }}
        >
          <span className={styles.button__text}>+</span>
        </button>
      </td>
      <td className={`${styles.cell} ${styles.cell__total}`}>
        {formatPriceString(lineItem.totalPrice)}
      </td>
      <td className={styles.cell}>
        <button
          className={styles.delete}
          onClick={() => {
            const clearCart = async (): Promise<void> => {
              dispatch(
                setCart(
                  await deleteProductFromCart({
                    cartId: cart.id,
                    cartVersion: cart.version,
                    lineItemId: lineItem.id
                  }).unwrap()
                )
              );
            };

            clearCart();
          }}
        >
          <FaRegTrashCan className={styles.delete__icon} size={22} />
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
