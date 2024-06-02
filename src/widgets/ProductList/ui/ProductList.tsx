import styles from './ProductList.module.scss';
import DaisyImg from '@/shared/assets/img/BD-01.png';

// interface IProduct {
//   id: string;
//   title: string;
//   price: number;
// }

const ProductList = () => {
  // const products: IProduct[] = [];

  return (
    <div className={styles['products-container']}>
      <div className={styles['product-card']}>
        <div className={styles['product-img']}>
          <img src={DaisyImg} alt='Barberton Daisy' />
        </div>
        <div className={styles['product-info']}>
          <h4 className={styles['product-title']}>Barberton Daisy</h4>
          <p className={styles['product-price']}>$119.00</p>
        </div>
      </div>
      <div className={styles['product-card']}>
        <div className={styles['product-img']}>
          <img src={DaisyImg} alt='Barberton Daisy' />
        </div>
        <div className={styles['product-info']}>
          <h4 className={styles['product-title']}>Barberton Daisy</h4>
          <p className={styles['product-price']}>$119.00</p>
        </div>
      </div>
      <div className={styles['product-card']}>
        <div className={styles['product-img']}>
          <img src={DaisyImg} alt='Barberton Daisy' />
        </div>
        <div className={styles['product-info']}>
          <h4 className={styles['product-title']}>Barberton Daisy</h4>
          <p className={styles['product-price']}>$119.00</p>
        </div>
      </div>
      {/* {products.map((product) => (
        <div className={styles['product-card']} key={product.id}>
          <div className={styles['product-img']}>
            <img src={DaisyImg} alt='Barberton Daisy' />
          </div>
          <div className={styles['product-info']}>
            <h4 className={styles['product-title']}>Barberton Daisy</h4>
            <p className={styles['product-price']}>$119.00</p>
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default ProductList;
