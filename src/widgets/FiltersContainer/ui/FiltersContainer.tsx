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
import { setSelectedCategoryId } from '@/entities/product/model/productsViewSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/app/store';
import { defaultLocale } from '@/shared/constants/settings';

const FiltersContainer = () => {
  const dispatch = useDispatch();
  const [requestCategories /* , { isCategoriesLoading } */] =
    useGetCategoriesMutation();
  const [requestProductsInCategories /* , { isProductsLoading } */] =
    useGetProductsByCategoryIdMutation();
  const categories = useAppSelector((state) => state.categories.categories);
  const selectedCategory = useAppSelector(
    (state) => state.productsView.selectedCategoryId
  );

  const [categorySizes, setCategorySizes] = useState<Map<string, number>>();

  useEffect(() => {
    async function fetchData() {
      const result = await requestCategories(); // as unknown as CategoryPagedQueryResponse;
      const fetchedCategories = (result as { data: CategoryPagedQueryResponse })
        .data.results;
      dispatch(setCategories(fetchedCategories));
      dispatch(setSelectedCategoryId(fetchedCategories[0].id));

      const sizes = new Map<string, number>();
      fetchedCategories.forEach(async (category: Category) => {
        const queryResult = (await requestProductsInCategories({
          categoryId: category.id,
          pageSize: 1,
          currentPage: 1,
          sortOption: `name.${defaultLocale} asc`
        })) as unknown as { data: ProductProjectionPagedQueryResponse };
        sizes.set(category.id, Number(queryResult.data.total));
      });
      setCategorySizes(sizes);
    }
    fetchData();
  }, []);

  return (
    <div className={styles.filtersContainer}>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        categorySizes={categorySizes}
      />
      {/* <SizeFilter /> */}
      {/* <PriceFilter /> */}
      {/* <ActionBanner /> */}
    </div>
  );
};

export default FiltersContainer;
