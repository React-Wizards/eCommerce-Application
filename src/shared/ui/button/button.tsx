import styles from './button.module.scss';
import React from 'react';

type ButtonProps = {
  text: string;
  callback: () => void;
  disabled?: boolean;
  focus?: boolean;
  submit?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  text,
  callback,
  submit = false,
  disabled = false,
  focus = false
}) => {
  return (
    <button
      className={styles['btn']}
      type={submit ? 'submit' : 'button'}
      onClick={callback}
      disabled={disabled}
      autoFocus={focus}>
      {text}
    </button>
  );
};

export default Button;
