import { useSelector } from 'react-redux';
import type { Cart, LineItem } from '@commercetools/platform-sdk';
import type { RootState } from '@/app/store';
import CartItem from '@/entities/CartItem';
import styles from './CartList.module.scss';
import { useDeleteProductFromCartMutation } from '@/features/api/meApi';
import { useDispatch } from 'react-redux';
import { setCart } from '@/entities/cart';
import Loader from '@/shared/Loader';

const CartList = () => {
  const cart: Cart = useSelector<RootState, Cart>(
    (store: RootState): Cart => store.cart.cart!
  );
  const [deleteProductFromCart, { isLoading }] =
    useDeleteProductFromCartMutation();
  const dispatch = useDispatch();

  return (
    <>
      {isLoading && <Loader />}
      {
        <div className={styles.wrapper}>
          <table className={styles.cart}>
            <thead className={styles.head}>
              <tr className={styles.head__row}>
                <td className={styles.head__cell}>Products</td>
                <td className={styles.head__cell}>Price</td>
                <td className={styles.head__cell}>Quantity</td>
                <td className={styles.head__cell}>Total</td>
              </tr>
            </thead>
            <tbody className={styles.body}>
              {cart.lineItems.map((lineItem: LineItem) => (
                <CartItem key={lineItem.id} lineItem={lineItem} />
              ))}
            </tbody>
          </table>
          <button
            className={styles.clear}
            onClick={(): void => {
              let prevCartId: string = cart.id;
              let prevCartVersion: number = cart.version;

              const removeCart = async () => {
                for (const { id } of cart.lineItems) {
                  const newCart: Cart = await deleteProductFromCart({
                    cartId: prevCartId,
                    cartVersion: prevCartVersion,
                    lineItemId: id
                  }).unwrap();

                  prevCartId = newCart.id;
                  prevCartVersion = newCart.version;

                  dispatch(
                    setCart({
                      ...newCart,
                      totalLineItemQuantity: 0,
                      lineItems: []
                    })
                  );
                }
              };

              removeCart();
            }}
          >
            Clear Cart
          </button>
        </div>
      }
    </>
  );
};

export default CartList;
