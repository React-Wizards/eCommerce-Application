import type { RootState } from '@/app/store';
import type { Cart, Customer } from '@commercetools/platform-sdk';
import { Link } from 'react-router-dom';
import { logout } from '@/entities/customer';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import burgerMenuIcon from '@/shared/assets/img/burger-menu-icon.svg';
import SearchBox from '@/widgets/SearchBox';
import { FaTimes } from 'react-icons/fa';
import logo from '@/shared/assets/img/logo-horiz.svg';
import loginIcon from '@/shared/assets/img/login-icon.svg';
import logoutIcon from '@/shared/assets/img/logout-icon.svg';
import registerIcon from '@/shared/assets/img/register-icon.svg';
import profileIcon from '@/shared/assets/img/profile-icon.svg';
import infoIcon from '@/shared/assets/img/info.svg';
import cartIcon from '@/shared/assets/img/cart.svg';
import { useSelector } from 'react-redux';
import styles from './Header.module.scss';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const customer: Customer | null = useSelector<RootState, Customer | null>(
    (store: RootState) => store.customer.user
  );
  const cart: Cart | null = useSelector<RootState, Cart | null>(
    (store: RootState): Cart | null => store.cart.cart
  );
  const cartItemsCount: number = cart?.totalLineItemQuantity || 0;
  const toggleBurgerMenu = () => {
    setIsOpen(!isOpen);
  };
  const dispatch = useDispatch();

  return (
    <div className={styles.headerContainer}>
      <nav className={styles.nav}>
        <Link
          to='/home'
          className={styles.homeLink}
          title='Green Shop home page'>
          <img className={styles.logo} src={logo} alt='logo' />
          <span className={styles.logoText}>GREENSHOP</span>
        </Link>
      </nav>
      <div className={styles.searchBox}>
        <SearchBox />
      </div>
      <div className={styles.controlsWrapper}>
        <Link
          className={styles.cartLink}
          to='/cart'
          title='Checkout'
          data-items-count={cartItemsCount > 99 ? '99+' : cartItemsCount || ''}>
          <img className={styles.cartLogo} src={cartIcon} />
        </Link>

        <div className={styles.headerControls}>
          {customer ? (
            <Link
              to={'/profile'}
              className={styles.user}
              title={`${customer.firstName} ${customer.lastName} profile`}>
              <img className={styles.btnLogo} src={profileIcon} />
              <span
                className={
                  styles.btnText
                }>{`${customer.firstName} ${customer.lastName}`}</span>
            </Link>
          ) : null}
          <nav className={styles.nav}>
            <div className={styles.links}>
              {customer ? (
                <div
                  className={styles.login}
                  onClick={(): void => {
                    dispatch(logout());
                  }}
                  title='Sign out'>
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

        <img
          className={styles['burger-icon']}
          src={burgerMenuIcon}
          alt='Burger Menu Icon'
          onClick={() => toggleBurgerMenu()}
        />

        <Link className={styles.aboutLink} to='/about' title='About our team'>
          <img className={styles.aboutLogo} src={infoIcon} />
        </Link>
      </div>

      {isOpen && (
        <div className={styles['burger-menu']}>
          <FaTimes
            className={styles['close-btn']}
            onClick={() => {
              setIsOpen(false);
            }}
          />
          {customer ? (
            <Link
              to={'/profile'}
              className={styles.user}
              title={`${customer.firstName} ${customer.lastName}`}>
              <img className={styles.btnLogo} src={profileIcon} />
              <span
                className={
                  styles.btnText
                }>{`${customer.firstName} ${customer.lastName}`}</span>
            </Link>
          ) : null}

          <div className={styles['links-mobile']}>
            {customer ? (
              <div
                className={styles.login}
                onClick={(): void => {
                  dispatch(logout());
                }}>
                <img className={styles.btnLogo} src={logoutIcon} />
                <span className={styles.btnText}>Logout</span>
              </div>
            ) : (
              <Link className={styles.login} to='/login'>
                <img className={styles.btnLogo} src={loginIcon} />
                <span className={styles.BtnText}>Login</span>
              </Link>
            )}
            <Link className={styles.register} to='/register'>
              <img className={styles.btnLogo} src={registerIcon} />
              <span className={styles.btnText}>Register</span>
            </Link>
          </div>
          <div className={styles.searchBox}>
            <SearchBox />
          </div>
        </div>
      )}
    </div>
  );
};
export default Header;
