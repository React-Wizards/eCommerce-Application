import type { RootState } from '@/app/store';
import type { Customer } from '@commercetools/platform-sdk';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '@/entities/customer';
import logo from '@/shared/assets/img/logo-horiz.svg';
import styles from './Home.module.scss';
import Categories from '@/widgets/Categories';
import Breadcrumbs from '@/features/Breadcrumbs';
import burgerMenuIcon from '@/shared/assets/img/burger-menu-icon.svg';
import { FaTimes } from 'react-icons/fa';

const Home = () => {
  const customer: Customer | null = useSelector(
    (store: RootState): Customer | null => store.customer.user
  );
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link to='/home'>
            <img className={styles.logo} src={logo} alt='logo' />
          </Link>
          <div className={`${styles['page-links']} ${styles['hidden']}`}>
            <Link className={styles['nav-item']} to='/home'>
              Home
            </Link>
            <Link className={styles['nav-item']} to='/home/shop'>
              Shop
            </Link>
          </div>
          <div className={styles.links}>
            {customer ? (
              <button
                className={styles.login}
                onClick={(): void => {
                  dispatch(logout());
                }}>
                Logout
              </button>
            ) : (
              <Link className={styles.login} to='/login'>
                Login
              </Link>
            )}
            <Link className={styles.register} to='/register'>
              Register
            </Link>
          </div>
          <img
            className={styles['burger-icon']}
            src={burgerMenuIcon}
            alt='Burger Menu Icon'
            onClick={() => toggleBurgerMenu()}
          />
        </nav>
        <div className='flex gap-[30px]'>
          <Categories />
          <div className='flex flex-col mt-10 max-w-[840px]'>
            <Breadcrumbs />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={styles['burger-menu']}>
          <FaTimes
            className={styles['close-btn']}
            onClick={() => {
              setIsOpen(false);
            }}
          />
          <div className={styles['page-links-mobile']}>
            <Link className={styles['nav-item']} to='/home'>
              Home
            </Link>
            <Link className={styles['nav-item']} to='/home/shop'>
              Shop
            </Link>
          </div>
          <div className={styles['links-mobile']}>
            {customer ? (
              <button
                className={styles.login}
                onClick={(): void => {
                  dispatch(logout());
                }}>
                Logout
              </button>
            ) : (
              <Link className={styles.login} to='/login'>
                Login
              </Link>
            )}
            <Link className={styles.register} to='/register'>
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
