import { useNavigate } from 'react-router-dom';
import Input from '@/features/InputLogin/ui/input';
import Button from '@/shared/Button/ui/button';
import logo from '@/shared/assets/img/logo.svg';

import styles from './loginPage.module.scss';

const LoginPage = () => {
  const btnText = 'Login';

  const navigate = useNavigate();

  return (
    <div className={styles['login-wrapper']}>
      <div className={styles['login-header']}>
        <span className={styles['login-caption']}>Login</span>
        <span className={styles['login-divider']}>I</span>
        <a
          href='/register'
          className={styles['login-link']}
          onClick={(e) => {
            e.preventDefault();
            navigate('/register');
          }}>
          Register
        </a>
      </div>
      <p className={styles['login-text']}>
        Enter your username and password to login.
      </p>
      <form className={styles['form']}>
        <Input />
        <Button text={btnText} disabled={false} focus submit />
      </form>
      <div className={styles['img-wrapper']}>
        <img src={logo} alt='Green shop Logo' />
      </div>
    </div>
  );
};

export default LoginPage;
