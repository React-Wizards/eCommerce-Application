import React, { useState } from 'react';
import { InputProps } from '@/shared/ui/input/input';
import Input from '@/shared/ui/input/input';
import Button from '@/shared/ui/button/button';
import logo from '@/shared/assets/img/logo.svg';
import { ChangeEvent } from 'react';
import hideIcon from '@/shared/assets/img/hide-icon.svg';
import showIcon from '@/shared/assets/img/show-icon.svg';

import styles from './loginPage.module.scss';
import { emailValidator } from '@/features/validation/emailValidator';

const inputList: InputProps[] = [
  {
    id: 'email address',
    type: 'text',
    name: 'email',
    isRequired: true,
    placeholder: 'Email address',
    handleChange: () => {},
    onClick: () => {},
    src: ''
  },
  {
    id: 'password',
    type: 'password',
    name: 'password',
    isRequired: true,
    placeholder: 'Password',
    handleChange: () => {},
    onClick: () => {},
    src: hideIcon
  }
];

const LoginPage: React.FC = () => {
  const btnText = 'Login';
  const [value, setValue] = useState('');
  const [isChanged, setChange] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePwdVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const onChangeinputData = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setChange(true);
    console.log(emailValidator(value));
    console.log(value);
    console.log(isChanged);
  };

  return (
    <div className={styles['login-wrapper']}>
      <div className={styles['login-header']}>
        <span className={styles['login-caption']}>Login</span>
        <span className={styles['login-divider']}>I</span>
        <a href='/register' className={styles['login-link']}>
          Register
        </a>
      </div>
      <p className={styles['login-text']}>
        Enter your username and password to login.
      </p>
      <form className={styles['form']}>
        <div className={styles['inputs-wrapper']}>
          {inputList.map((input, index) => (
            <Input
              id={input.id}
              type={
                input.name === 'email'
                  ? 'text'
                  : passwordShown
                    ? 'text'
                    : 'password'
              }
              name={input.name}
              isRequired={input.isRequired}
              placeholder={input.placeholder}
              handleChange={onChangeinputData}
              onClick={
                input.name === 'password' ? togglePwdVisiblity : () => {}
              }
              src={
                input.name === 'email'
                  ? ''
                  : passwordShown
                    ? showIcon
                    : hideIcon
              }
              key={index}
            />
          ))}
        </div>
        <Button
          text={btnText}
          callback={() => {}}
          disabled={true}
          focus={true}
          submit={true}
        />
      </form>
      <div className={styles['img-wrapper']}>
        <img src={logo} alt='Green shop Logo' />
      </div>
    </div>
  );
};

export default LoginPage;
