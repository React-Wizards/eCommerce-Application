import styles from './ProductInfo.module.scss';

const ProductInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles['product-header']}>
        <h1 className={styles['product-title']}>Barberton Daisy</h1>
        <div>
          <span className={styles['product-price-sale']}>$100.00</span>
          <span className={styles['product-price']}>$119.00</span>
        </div>
      </div>
      <div>
        <h3 className={styles['product-subtitle']}>Short description:</h3>
        <p className={styles['product-description']}>
          The ceramic cylinder planters come with a wooden stand to help elevate
          your plants off the ground. The ceramic cylinder planters come with a
          wooden stand to help elevate your plants off the ground.
        </p>
      </div>
      <div>
        <h3 className={styles['product-subtitle']}>Size:</h3>
        <div className={styles['size-btns']}>
          <button className={styles['size-btn']}>S</button>
          <button className={styles['size-btn']}>M</button>
          <button className={styles['size-btn']}>L</button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
