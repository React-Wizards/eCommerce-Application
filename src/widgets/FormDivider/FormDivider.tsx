import styles from './FormDivider.module.scss';

const FormDivider = (props: { text: string }) => {
  return (
    <p className={styles['form-divider']}>
      <span className={styles['divider-line']}></span>
      <span className={styles['divider-text']}>{props.text}</span>
      <span className={styles['divider-line']}></span>
    </p>
  );
};

export default FormDivider;
