import { RootState, useAppSelector } from '@/app/store';
import type { Customer } from '@commercetools/platform-sdk';
import { useSelector } from 'react-redux';
import styles from './Home.module.scss';
import ProductsContainer from '@/widgets/ProductsContainer';
import FiltersContainer from '@/widgets/FiltersContainer';
import Header from '@/features/Header';

const Home = () => {
  const customer: Customer | null = useSelector(
    (store: RootState): Customer | null => store.customer.user
  );

  const searchText = useAppSelector(
    (state: RootState) => state.productsView.searchText
  );

  return (
    <div>
      <Header customer={customer} />
      <main className={styles.mainContainer}>
        <div className={styles.filtersWrapper}>
          <FiltersContainer />
        </div>
        <div className={styles.productsWrapper}>
          <ProductsContainer searchText={searchText} />
        </div>
      </main>
    </div>
  );
};

export default Home;
