import styles from './input.module.scss';
import {
  ChangeEvent,
  MouseEvent,
  useState,
  HTMLInputTypeAttribute,
  useEffect
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
  onClick?: (e: MouseEvent<HTMLImageElement>) => void;
};

const inputEmail: InputProps = {
  id: 'email address',
  type: 'email',
  name: 'email',
  isRequired: true,
  placeholder: 'Email address'
};

const inputPassword: InputProps = {
  id: 'password',
  name: 'password',
  isRequired: true,
  placeholder: 'Password'
};

// custom hook for input validation
const useValidation = (value: string) => {
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [isEmailErrorTxt, setIsEmailErrorTxt] = useState('');

  const [isValidPwd, setIsValidPwd] = useState<boolean>(false);
  const [isPwdErrorTxt, setIsPwdErrorTxt] = useState('');

  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  useEffect(() => {
    const resEmail = emailValidator(value);
    resEmail.result ? setIsValidEmail(true) : setIsValidEmail(false);
    resEmail.message
      ? setIsEmailErrorTxt(resEmail.message)
      : setIsEmailErrorTxt('');

    const resPwd = passwordValidator(value);
    resPwd.result ? setIsValidPwd(true) : setIsValidPwd(false);
    resEmail.message ? setIsPwdErrorTxt(resPwd.message) : setIsPwdErrorTxt('');

    value ? setIsEmpty(false) : setIsEmpty(true);
  }, [value]);

  return { isValidEmail, isEmailErrorTxt, isValidPwd, isPwdErrorTxt, isEmpty };
};

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const valid = useValidation(value);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setIsChanged(true);
  };

  return { value, isChanged, onChange, ...valid };
};

const Input = () => {
  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  const togglePwdVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const email = useInput('');
  const password = useInput('');
  return (
    <div className={styles['inputs-wrapper']}>
      <div className='flex flex-col mb-4'>
        <div className={styles['input-container']}>
          <input
            value={email.value}
            className={
              (!email.isValidEmail && email.isChanged) ||
              (email.isChanged && email.isEmpty)
                ? [styles['input-error'], styles['input']].join(' ')
                : styles['input']
            }
            id={inputEmail.id}
            placeholder={inputEmail.placeholder}
            type={inputEmail.type}
            required={inputEmail.isRequired}
            name={inputEmail.name}
            onChange={(e) => email.onChange(e)}
          />
        </div>
        {email.isChanged && email.isEmpty && (
          <label className={styles['error']}>Email is required</label>
        )}
        {!email.isValidEmail && email.isChanged && (
          <label className={styles['error']}>{email.isEmailErrorTxt}</label>
        )}
      </div>
      <div className='flex flex-col'>
        <div className={styles['input-container']}>
          <input
            value={password.value}
            className={
              (!password.isValidPwd && password.isChanged) ||
              (password.isChanged && password.isEmpty)
                ? [styles['input-error'], styles['input']].join(' ')
                : styles['input']
            }
            id={inputPassword.id}
            placeholder={inputPassword.placeholder}
            type={passwordShown ? 'text' : 'password'}
            required={inputPassword.isRequired}
            name={inputPassword.name}
            onChange={(e) => password.onChange(e)}
          />
          <img
            src={passwordShown && !password.isEmpty ? showIcon : hideIcon}
            alt=''
            className={styles['hide-icon']}
            onClick={togglePwdVisiblity}
          />
        </div>
        {password.isChanged && password.isEmpty && (
          <label className={styles['error']}>Password is required</label>
        )}
        {!password.isValidPwd && password.isChanged && (
          <label className={styles['error']}>{password.isPwdErrorTxt}</label>
        )}
      </div>
    </div>
  );
};

export default Input;
