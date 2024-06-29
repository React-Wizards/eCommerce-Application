import ProductsContainer from '@/widgets/ProductsContainer';
import FiltersContainer from '@/widgets/FiltersContainer';
import Discounts from '@/widgets/Discounts';
import Header from '@/features/Header';
import styles from './Home.module.scss';

const Home = () => {
  return (
    <div>
      <Header />
      <main className={styles.mainContainer}>
        <div className={styles.filtersWrapper}>
          <FiltersContainer />
          <Discounts />
        </div>
        <div className={styles.productsWrapper}>
          <ProductsContainer />
        </div>
      </main>
    </div>
  );
};

export default Home;
