import type { RootState } from '@/app/store';
import type { Customer } from '@commercetools/platform-sdk';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '@/entities/customer';
import logo from '@/shared/assets/img/logo.svg';
import styles from './Home.module.scss';

const Home = () => {
  const customer: Customer | null = useSelector(
    (store: RootState): Customer | null => store.customer.user
  );
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link to='/home'>
          <img className={styles.logo} src={logo} alt='logo' />
        </Link>
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
      </nav>
    </div>
  );
};

export default Home;
