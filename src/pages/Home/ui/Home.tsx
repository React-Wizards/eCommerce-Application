import { RootState, useAppSelector } from '@/app/store';
import { Customer } from '@commercetools/platform-sdk';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Categories from '@/widgets/Categories';
import logo from '@/shared/assets/img/logo-horiz.svg';
import styles from './Home.module.scss';
import Breadcrumbs from '@/features/Breadcrumbs';
import ProductsContainer from '@/widgets/ProductsContainer';
import TokenStorage from '@/shared/api/tokenStorage';
import burgerMenuIcon from '@/shared/assets/img/burger-menu-icon.svg';
import { FaTimes } from 'react-icons/fa';
import FiltersContainer from '@/widgets/FiltersContainer';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { setSearchText } from '@/entities/product/model/productsViewSlice';
import useFieldValidation from '@/pages/RegistrationPage/model/useFieldValidation';
import minLength from '@/pages/RegistrationPage/lib/validators/min-length';
import onlyLetters from '@/pages/RegistrationPage/lib/validators/only-letters';
import useFormValidation from '@/pages/RegistrationPage/model/useFormValidation';
import { logout } from '@/entities/customer';

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

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link to='/home'>
          <img className={styles.logo} src={logo} alt='logo' />
        </Link>
        <form
          className={styles.searchBox}
          name='searchBox'
          onSubmit={onSearchSubmitHandler}>
          <label
            className='input-label'
            data-error-message={searchTextInput.error || ''}>
            <input
              type='text'
              className={styles.searchInput}
              tabIndex={0}
              value={searchTextInput.value}
              onChange={onSearchTextChangeHandler}
              onBlur={onBlurSearchTextHandler}
            />
          </label>
          {searchTextInput.value ? (
            <button
              type='reset'
              className={styles.clearSearchTextBtn}
              onClick={onClearSearchTextHandler}
              tabIndex={0}>
              X
            </button>
          ) : null}
          <button
            type='submit'
            className={styles.searchButton}
            disabled={!searchForm.isFormValid}>
            <svg
              width='21'
              height='20'
              viewBox='0 0 21 20'
              xmlns='http://www.w3.org/2000/svg'>
              <path d='M14.5827 16.0029C10.5828 19.1865 4.99146 18.3056 2.02983 14.6542C-0.828663 11.129 -0.649891 6.04347 2.45113 2.82482C5.6553 -0.500594 10.6928 -0.944524 14.3445 1.78337C15.6528 2.76051 16.6298 4.00364 17.2662 5.50838C17.9063 7.02186 18.1007 8.59654 17.8787 10.2205C17.6575 11.837 17.0118 13.2775 15.961 14.6217C16.046 14.6773 16.1366 14.7173 16.2017 14.7822C17.3568 15.9311 18.5076 17.0843 19.6627 18.2331C19.9365 18.5054 20.0728 18.8225 19.9915 19.2047C19.8302 19.9651 18.9239 20.2586 18.3426 19.7366C18.07 19.4925 17.8194 19.2234 17.5606 18.9649C16.6117 18.0177 15.6635 17.0699 14.7146 16.1227C14.6752 16.0853 14.634 16.0503 14.5827 16.0029ZM15.9716 8.98677C15.9816 5.12689 12.8619 2.00627 8.98885 2.00065C5.12648 1.99503 2.0092 5.09068 1.99233 8.94806C1.97545 12.8173 5.08897 15.9467 8.97385 15.9648C12.8206 15.9829 15.9616 12.8504 15.9716 8.98677Z' />
            </svg>
          </button>
        </form>
        <div className={styles.links}>
          {customer ? (
            <Link to={'/profile'} className={styles.user}>
              {`${customer.firstName} ${customer.lastName}`}
            </Link>
          ) : null}
          {customer ? (
            <button className={styles.login} onClick={logoutHandler}>
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
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              color: '#46A358',
              cursor: 'pointer'
            }}
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
      </nav>
      <main className={styles.mainContainer}>
        <FiltersContainer />
        <ProductsContainer searchText={searchText} />
      </main>
    </div>
  );
};

export default Home;
