import { Link } from 'react-router-dom';
import logo from '@/shared/assets/img/logo.svg';
import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link to='/home'>
          <img className={styles.logo} src={logo} alt='logo' />
        </Link>
        <div className={styles.links}>
          <Link className={styles.login} to='/login'>
            Login
          </Link>
          <Link className={styles.register} to='/register'>
            Register
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Home;
