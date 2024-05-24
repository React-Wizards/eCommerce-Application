import { type FormEvent, useState } from 'react';
import type {
  ClientResponse,
  CustomerSignInResult,
  CustomerSignin
} from '@commercetools/platform-sdk';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '@/entities/customer/model/customerSlice';
import Input from '@/features/InputLogin';
import Modal from '@/shared/ErrorModal';
import Button from '@/shared/Button';
import { authRoot } from '@/shared/api';
import logo from '@/shared/assets/img/logo.svg';
import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const [customer, setCustomer] = useState<CustomerSignin>(
    {} as CustomerSignin
  );
  const [isVisible, seIsVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function CustomerErrorHandler(message: string): void {
    seIsVisible(true);
    setErrorMessage(message);

    setTimeout(() => {
      seIsVisible(false);
    }, 1500);
  }

  const signIn = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {
      const result: ClientResponse<CustomerSignInResult> = await authRoot
        .me()
        .login()
        .post({
          body: customer
        })
        .execute();

      dispatch(login(result.body.customer));
      navigate('/home');
    } catch (error: unknown) {
      if (error instanceof Error) {
        CustomerErrorHandler(error.message);
      } else {
        console.error(`Unknown error! ${error}`);
      }
    }
  };

  return (
    <div>
      <Modal message={errorMessage} isVisible={isVisible} />
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
        <form className={styles['form']} onSubmit={signIn}>
          <Input setClient={setCustomer} />
          <Button text={'Login'} focus submit />
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
        <form className={styles['form']} onSubmit={signIn}>
          <Input setClient={setCustomer} />
          <Button text={'Login'} focus submit />
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
