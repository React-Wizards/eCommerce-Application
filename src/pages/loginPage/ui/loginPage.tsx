import { Link } from 'react-router-dom';
import Input from '@/features/InputLogin/ui/input';
import Button from '@/shared/Button/ui/button';
import logo from '@/shared/assets/img/logo.svg';

import styles from './loginPage.module.scss';

const LoginPage = () => {
  const btnText = 'Login';

  return (
    <div>
      <div
        className={[
          styles['login-wrapper'],
          styles['login-wrapper-desktop']
        ].join(' ')}>
        <div className={styles['login-header']}>
          <Link className={styles['login-caption']} to='/login'>
            Login
          </Link>
          <span className={styles['login-divider']}></span>
          <Link to='/register' className={styles['login-link']}>
            Register
          </Link>
        </div>
        <p className={styles['login-text']}>
          Enter your username and password to login.
        </p>
        <form className={styles['form']}>
          <Input />
          <Button text={btnText} disabled={false} focus submit />
        </form>
        <Link className={styles['img-wrapper']} to='/home'>
          <img src={logo} alt='Green shop Logo' />
        </Link>
      </div>
      <div
        className={[
          styles['login-wrapper'],
          styles['login-wrapper-mobile']
        ].join(' ')}>
        <Link className={styles['img-wrapper']} to='/home'>
          <img src={logo} alt='Green shop Logo' />
        </Link>
        <div className={styles['login-header']}>
          <span className={styles['login-caption']}>Login</span>
        </div>
        <form className={styles['form']}>
          <Input />
          <Button text={btnText} disabled={false} focus submit />
        </form>
        <div className='flex justify-center items-center'>
          <span className='text-[15px]'>Don’t have an account? </span>
          <Link to='/register' className={styles['login-link']}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
