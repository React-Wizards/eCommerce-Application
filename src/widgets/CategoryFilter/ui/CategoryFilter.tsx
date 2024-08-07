import styles from './CategoryFilter.module.scss';
import { useDispatch } from 'react-redux';
import { Category } from '@commercetools/platform-sdk';
import {
  setCurrentPage,
  setSelectedCategoryId
} from '@/entities/product/model/productsViewSlice';
import { defaultLocale } from '@/shared/constants/settings';

const CategoryFilter = (props: {
  categories: Array<Category>;
  selectedCategory: string;
  categorySizes: Map<string, number> | undefined;
}) => {
  const dispatch = useDispatch();
  const onCategoryClickHandler = (categoryId: string) => {
    dispatch(setSelectedCategoryId(categoryId));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className={styles.categoryFilterCointainer}>
      <h3 className={styles.categoryFilterHeading}>Categories</h3>
      <ul className={styles.categoriesList}>
        {props.categories.map((category: Category) => {
          return (
            <li
              className={[
                styles.categoryElement,
                props.selectedCategory === category.id ? styles._selected : ''
              ].join(' ')}
              onClick={() => {
                onCategoryClickHandler(category.id);
              }}
              key={category.id}
            >
              <div className={styles.categoryName}>
                {category.name[defaultLocale]}
              </div>
              <div
                className={styles.categorySize}
              >{`(${props.categorySizes?.get(category.id) || 0})`}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryFilter;
