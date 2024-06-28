import ProductsContainer from '@/widgets/ProductsContainer';
import FiltersContainer from '@/widgets/FiltersContainer';
import Discounts from '@/widgets/Discounts';
import Header from '@/features/Header';
import styles from './Home.module.scss';
import Categories from '@/widgets/Categories';
import Breadcrumbs from '@/features/Breadcrumbs';
import burgerMenuIcon from '@/shared/assets/img/burger-menu-icon.svg';
import ProductsContainer from '@/widgets/ProductsContainer';
import { FaTimes } from 'react-icons/fa';
import TokenStorage from '@/shared/api/tokenStorage';
import { setSearchText } from '@/entities/product/model/productsViewSlice';
import FiltersContainer from '@/widgets/FiltersContainer';
import useFieldValidation from '@/pages/RegistrationPage/model/useFieldValidation';
import minLength from '@/pages/RegistrationPage/lib/validators/min-length';
import onlyLetters from '@/pages/RegistrationPage/lib/validators/only-letters';
import useFormValidation from '@/pages/RegistrationPage/model/useFormValidation';

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
