import { RootState } from '@/app/store';
import { Customer } from '@commercetools/platform-sdk';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '@/shared/assets/img/logo.svg';
import styles from './Home.module.scss';
import ProductsContainer from '@/widgets/ProductsContainer';
import TokenStorage from '@/shared/api/tokenStorage';
import { logout } from '@/entities/customer';
import FiltersContainer from '@/widgets/FiltersContainer';

const Home = () => {
  const customer: Customer | null = useSelector(
    (store: RootState): Customer | null => store.customer.user
  );

  const tokenStorage = new TokenStorage('ecom');

  const dispatch = useDispatch();

  const logoutHandler = async () => {
    tokenStorage.removeItem('user-token');
    tokenStorage.removeItem('user-refresh-token');
    dispatch(logout());
  };

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link to='/home'>
          <img className={styles.logo} src={logo} alt='logo' />
        </Link>
        <div className={styles.links}>
          {customer ? (
            <div className={styles.user}>
              {' '}
              {`${customer.firstName} ${customer.lastName}`}{' '}
            </div>
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
        </div>
      </nav>
      {/* <Header /> */}
      {/* <Welcome /> */}

      <main className={styles.mainContainer}>
        <FiltersContainer /> {/*// TODO: add hidding filter panel to burger */}
        <ProductsContainer />
      </main>
    </div>
  );
};

export default Home;
