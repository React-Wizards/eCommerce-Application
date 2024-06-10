import styles from './Size.module.scss';

const Size = () => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Size</h4>
      <ul className={styles['size-list']}>
        <li className={styles['size-item']}>
          <a href='#'>Small</a>
          <span>()</span>
        </li>
        <li className={styles['size-item']}>
          <a href='#'>Medium</a>
          <span>()</span>
        </li>
        <li className={styles['size-item']}>
          <a href='#'>Large</a>
          <span>()</span>
        </li>
      </ul>
    </div>
  );
};

export default Size;
