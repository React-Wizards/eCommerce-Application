import styles from './BlockDivider.module.scss';

const BlockDivider = (props: { text: string }) => {
  return (
    <p className={styles['block-divider']}>
      <span className={styles['divider-line']}></span>
      <span className={styles['divider-text']}>{props.text}</span>
      <span className={styles['divider-line']}></span>
    </p>
  );
};

export default BlockDivider;
