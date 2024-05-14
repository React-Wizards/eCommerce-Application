import styles from './input.module.scss';
import { ChangeEvent, useState } from 'react';
// import hideIcon from '@/shared/assets/img/hide-icon.svg';
import { emailValidator } from '@/features/validation/emailValidator';
import { passwordValidator } from '@/features/validation/passwordValidator';

type InputProps = {
  id: string;
  type?: 'text' | 'password';
  name?: string;
  isRequired: boolean;
  placeholder?: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  src: string;
};

// type InputValue = {
//   name: string;
//   value: string;
//   isValid: boolean;
// };

const Input: React.FC<InputProps> = ({
  id,
  type = 'text',
  name,
  isRequired,
  placeholder,
  handleChange,
  onClick,
  src
}) => {
  const [value, setValue] = useState('');
  const [isChanged, setChange] = useState(false);

  const handleKeyUpInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    setChange(true);
    if (e.currentTarget.name === 'email') {
      const ans = emailValidator(value);
      console.log(ans);
    }
    if (e.currentTarget.name === 'password')
      console.log(passwordValidator(value));
    console.log(value);
    console.log(isChanged);
  };
  return (
    <div className={styles['input-container']}>
      <input
        className={styles['input']}
        id={id}
        placeholder={placeholder}
        type={type}
        required={isRequired}
        name={name}
        onChange={handleChange}
        onKeyUp={handleKeyUpInput}
      />
      <img src={src} alt='' className={styles['hide-icon']} onClick={onClick} />
    </div>
  );
};

export default Input;
export type { InputProps };
