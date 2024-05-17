import styles from './button.module.scss';

type ButtonProps = {
  text: string;
  callback?: () => void;
  disabled?: boolean;
  focus?: boolean;
  submit?: boolean;
};

const Button = ({
  text,
  callback,
  submit = false,
  disabled = false,
  focus = false
}: ButtonProps) => {
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