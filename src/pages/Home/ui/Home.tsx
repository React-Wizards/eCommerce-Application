import type { RootState, useAppSelector } from '@/app/store';
import type { Customer } from '@commercetools/platform-sdk';
import { useSelector, useDispatch } from 'react-redux';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '@/entities/customer';
import logo from '@/shared/assets/img/logo-horiz.svg';
import styles from './Home.module.scss';
import Categories from '@/widgets/Categories';
import Breadcrumbs from '@/features/Breadcrumbs';
import burgerMenuIcon from '@/shared/assets/img/burger-menu-icon.svg';
import ProductsContainer from '@/widgets/ProductsContainer';
import { FaTimes } from 'react-icons/fa';
import TokenStorage from '@/shared/api/tokenStorage';
import { setSearchText } from '@/entities/product/model/productsViewSlice';
import FiltersContainer from '@/widgets/FiltersContainer';
import useFieldValidation from '@/pages/RegistrationPage/model/useFieldValidation';
import minLength from '@/pages/RegistrationPage/lib/validators/min-length';
import onlyLetters from '@/pages/RegistrationPage/lib/validators/only-letters';
import useFormValidation from '@/pages/RegistrationPage/model/useFormValidation';

const Home = () => {
  const customer: Customer | null = useSelector(
    (store: RootState): Customer | null => store.customer.user
  );
  const tokenStorage = new TokenStorage('ecom');
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setIsOpen(!isOpen);
  };

  const searchText = useAppSelector(
    (state: RootState) => state.productsView.searchText
  );

  const logoutHandler = async () => {
    tokenStorage.removeItem('user-token');
    tokenStorage.removeItem('user-refresh-token');
    dispatch(logout());
  };

  const searchTextInput = useFieldValidation({
    type: 'text',
    id: 'searchtext',
    placeHolder: 'Search text',
    validators: [minLength(3), onlyLetters()]
  });

  const searchForm = useFormValidation({ fields: [searchTextInput] });

  const onSearchTextChangeHandler = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value) {
      searchTextInput.onChangeHandler(e);
    } else {
      searchTextInput.setValue('');
      searchTextInput.setError('');
    }
  };

  const onBlurSearchTextHandler = async () => {
    if (!searchTextInput.value) {
      dispatch(setSearchText(''));
    }
  };

  const onClearSearchTextHandler = async () => {
    dispatch(setSearchText(''));
    searchTextInput.setValue('');
    searchTextInput.setError('');
  };

  const onSearchSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSearchText(searchTextInput.value));
  };

  useEffect(() => {
    searchTextInput.setValue(searchText);
  }, [searchText]);

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
      <main className={styles.mainContainer}>
        <FiltersContainer />
        <ProductsContainer searchText={searchText} />
      </main>
    </div>
  );
};

export default Home;
