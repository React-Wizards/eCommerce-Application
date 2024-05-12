import styles from './input.module.scss';

type InputProps = {
  type?: 'text' | 'password';
  name?: string;
  isRequired: boolean;
  placeholder?: string;
};

const Input: React.FC<InputProps> = ({
  type = 'text',
  name,
  isRequired,
  placeholder
}) => {
  return (
    <input
      className={styles['input']}
      placeholder={placeholder}
      type={type}
      required={isRequired}
      name={name}
    />
  );
};

export default Input;
export type { InputProps };
