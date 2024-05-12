import React from 'react';
import { InputProps } from '@/shared/ui/input/input';
import Input from '@/shared/ui/input/input';
import logo from '@/shared/assets/img/logo.svg';

import styles from './loginPage.module.scss';

const inputList: InputProps[] = [
  {
    type: 'text',
    name: 'email',
    isRequired: true,
    placeholder: 'Email address'
  },
  {
    type: 'password',
    name: 'password',
    isRequired: true,
    placeholder: 'Password'
  }
];

const LoginPage: React.FC = () => {
  return (
    <div className={styles['login-wrapper']}>
      <form className={styles['form']}>
        <div className={styles['input-wrapper']}>
          {inputList.map((input, index) => (
            <Input
              type={input.type}
              name={input.name}
              isRequired={input.isRequired}
              placeholder={input.placeholder}
              key={index}
            />
          ))}
        </div>
      </form>
      <div className={styles['img-wrapper']}>
        <img src={logo} alt='Green shop Logo' />
      </div>
    </div>
  );
};

export default LoginPage;
