import { useNavigate } from 'react-router-dom';
import Input from '@/features/InputLogin/ui/input';
import Button from '@/shared/Button/ui/button';
import logo from '@/shared/assets/img/logo.svg';

import styles from './loginPage.module.scss';

const LoginPage = () => {
  const btnText = 'Login';

  const navigate = useNavigate();

  return (
    <div>
      {/* DESKTOP */}
      <div
        className={[
          styles['login-wrapper'],
          styles['login-wrapper-desktop']
        ].join(' ')}>
        <div className={styles['login-header']}>
          <span className={styles['login-caption']}>Login</span>
          <span className={styles['login-divider']}></span>
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
      {/* MOBILE */}
      <div
        className={[
          styles['login-wrapper'],
          styles['login-wrapper-mobile']
        ].join(' ')}>
        <div className={styles['img-wrapper']}>
          <img src={logo} alt='Green shop Logo' />
        </div>
        <div className={styles['login-header']}>
          <span className={styles['login-caption']}>Login</span>
        </div>
        <form className={styles['form']}>
          <Input />
          <Button text={btnText} disabled={false} focus submit />
        </form>
        <div className='flex justify-center items-center'>
          <span className='text-[15px]'>Don’t have an account? </span>
          <a
            href='/register'
            className={styles['login-link']}
            onClick={(e) => {
              e.preventDefault();
              navigate('/register');
            }}>
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
