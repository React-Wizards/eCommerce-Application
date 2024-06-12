import CategoryFilter from '@/widgets/CategoryFilter';
import styles from './FiltersContainer.module.scss';
import {
  useGetCategoriesMutation,
  useGetProductsByCategoryIdMutation
} from '@/features/api/appApi';
import { setCategories } from '@/entities/category';
import {
  Category,
  CategoryPagedQueryResponse,
  ProductProjectionPagedQueryResponse
} from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/app/store';
import { defaultLocale } from '@/shared/constants/settings';

const FiltersContainer = () => {
  const dispatch = useDispatch();
  const [requestCategories] = useGetCategoriesMutation();
  const [requestProductsInCategories] = useGetProductsByCategoryIdMutation();
  const categories = useAppSelector((state) => state.categories.categories);
  const selectedCategory = useAppSelector(
    (state) => state.productsView.selectedCategoryId
  );

  const [categorySizes, setCategorySizes] = useState<Map<string, number>>();

  useEffect(() => {
    async function fetchData() {
      const result = await requestCategories();
      const fetchedCategories = (result as { data: CategoryPagedQueryResponse })
        .data.results;
      dispatch(setCategories(fetchedCategories));

      const sizes = new Map<string, number>();
      fetchedCategories.forEach(async (category: Category) => {
        const queryResult: ProductProjectionPagedQueryResponse =
          await requestProductsInCategories({
            categoryId: category.id,
            pageSize: 1,
            currentPage: 1,
            sortOption: `name.${defaultLocale} asc`
          }).unwrap();
        sizes.set(category.id, Number(queryResult.total));
      });
      setCategorySizes(sizes);
    }
    fetchData();
  }, [dispatch, requestCategories, requestProductsInCategories]);

  return (
    <div className={styles.filtersContainer}>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        categorySizes={categorySizes}
      />
    </div>
  );
};

export default FiltersContainer;
