import styles from './input.module.scss';
import { ChangeEvent } from 'react';
// import hideIcon from '@/shared/assets/img/hide-icon.svg';

type InputProps = {
  id: string;
  type?: 'text' | 'password';
  name?: string;
  isRequired: boolean;
  placeholder?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
      />
      <img src={src} alt='' className={styles['hide-icon']} onClick={onClick} />
    </div>
  );
};

export default Input;
export type { InputProps };
