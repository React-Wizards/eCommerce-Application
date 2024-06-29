import type { Cart, Customer } from '@commercetools/platform-sdk';
import type { RootState } from '@/app/store';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import loginIcon from '@/shared/assets/img/login-icon.svg';
import logoutIcon from '@/shared/assets/img/logout-icon.svg';
import registerIcon from '@/shared/assets/img/register-icon.svg';
import profileIcon from '@/shared/assets/img/profile-icon.svg';
import infoIcon from '@/shared/assets/img/info.svg';
import cartIcon from '@/shared/assets/img/cart.svg';
import TokenStorage from '@/shared/api';
import { logout } from '@/entities/customer';
import styles from './Controls.module.scss';

const Controls = () => {
  const customer: Customer | null = useSelector<RootState, Customer | null>(
    (store: RootState) => store.customer.user
  );
  const cart: Cart | null = useSelector<RootState, Cart | null>(
    (store: RootState): Cart | null => store.cart.cart
  );
  const cartItemsCount: number = cart?.totalLineItemQuantity || 0;
  const dispatch = useDispatch();

  return (
    <div className={styles.controlsWrapper}>
      <Link
        className={styles.cartLink}
        to='/cart'
        title='Checkout'
        data-items-count={cartItemsCount > 99 ? '99+' : cartItemsCount || ''}
      >
        <img className={styles.cartLogo} src={cartIcon} />
      </Link>
      <div className={styles.headerControls}>
        {customer ? (
          <Link
            to={'/profile'}
            className={styles.user}
            title={`${customer.firstName} ${customer.lastName} profile`}
          >
            <img className={styles.btnLogo} src={profileIcon} />
            <span
              className={styles.btnText}
            >{`${customer.firstName} ${customer.lastName}`}</span>
          </Link>
        ) : null}
        <nav className={styles.nav}>
          <div className={styles.links}>
            {customer ? (
              <div
                className={styles.login}
                onClick={(): void => {
                  const tokenStorage = new TokenStorage('ecom');

                  dispatch(logout());
                  tokenStorage.clearItems();
                }}
                title='Sign out'
              >
                <img className={styles.btnLogo} src={logoutIcon} />
                <span className={styles.btnText}>Logout</span>
              </div>
            ) : (
              <Link className={styles.login} to='/login' title='Sign in'>
                <img className={styles.btnLogo} src={loginIcon} />
                <span className={styles.btnText}>Login</span>
              </Link>
            )}
            <Link className={styles.register} to='/register' title='Sign up'>
              <img className={styles.btnLogo} src={registerIcon} />
              <span className={styles.btnText}>Register</span>
            </Link>
          </div>
        </nav>
      </div>
      <Link className={styles.aboutLink} to='/about' title='About our team'>
        <img className={styles.aboutLogo} src={infoIcon} />
      </Link>
    </div>
  );
};

export default Controls;
