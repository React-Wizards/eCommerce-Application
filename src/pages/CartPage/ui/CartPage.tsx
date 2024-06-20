import Header from '@/features/Header';
import { useSelector } from 'react-redux';
import type { Cart } from '@commercetools/platform-sdk';
import type { RootState } from '@/app/store';
import EmptyCartMessage from '@/widgets/EmptyCartMessage';
import CartList from '@/widgets/CartList';
import CartTotal from '@/widgets/CartTotal';
import styles from './CartPage.module.scss';

const CartPage = () => {
  const cart: Cart | null = useSelector<RootState, Cart | null>(
    (store: RootState): Cart | null => store.cart.cart
  );

  return (
    <>
      <Header />
      {cart && cart.lineItems.length ? (
        <div className={styles.wrapper}>
          <CartList />
          <CartTotal />
        </div>
      ) : (
        <EmptyCartMessage />
      )}
    </>
  );
};

export default CartPage;
