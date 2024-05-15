import styles from './input.module.scss';
import {
  ChangeEvent,
  MouseEvent,
  useState,
  HTMLInputTypeAttribute
} from 'react';
import hideIcon from '@/shared/assets/img/hide-icon.svg';
import showIcon from '@/shared/assets/img/show-icon.svg';
import { emailValidator } from '@/features/Validation/emailValidator';
import { passwordValidator } from '@/features/Validation/passwordValidator';

type InputProps = {
  id?: string;
  type?: HTMLInputTypeAttribute;
  name?: string;
  isRequired: boolean;
  placeholder?: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: MouseEvent<HTMLImageElement>) => void;
};

const inputEmail: InputProps = {
  id: 'email address',
  type: 'email',
  name: 'email',
  isRequired: true,
  placeholder: 'Email address',
  handleChange: () => {}
};

const inputPassword: InputProps = {
  id: 'password',
  name: 'password',
  isRequired: true,
  placeholder: 'Password',
  handleChange: () => {}
};

const Input = () => {
  const [value, setValue] = useState('');
  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  const togglePwdVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const handleKeyUpInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    if (e.currentTarget.name === 'email') emailValidator(value);
    if (e.currentTarget.name === 'password') passwordValidator(value);
  };

  return (
    <div className={styles['inputs-wrapper']}>
      <div className={styles['input-container']}>
        <input
          className={styles['input']}
          id={inputEmail.id}
          placeholder={inputEmail.placeholder}
          type={inputEmail.type}
          required={inputEmail.isRequired}
          name={inputEmail.name}
          onChange={inputEmail.handleChange}
          onKeyUp={handleKeyUpInput}
        />
      </div>
      <div className={styles['input-container']}>
        <input
          className={styles['input']}
          id={inputPassword.id}
          placeholder={inputPassword.placeholder}
          type={passwordShown ? 'text' : 'password'}
          required={inputPassword.isRequired}
          name={inputPassword.name}
          onKeyUp={handleKeyUpInput}
        />
        <img
          src={passwordShown ? showIcon : hideIcon}
          alt=''
          className={styles['hide-icon']}
          onClick={togglePwdVisiblity}
        />
      </div>
    </div>
  );
};

export default Input;
