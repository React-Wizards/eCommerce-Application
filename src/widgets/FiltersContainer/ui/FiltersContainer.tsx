import CategoryFilter from '@/widgets/CategoryFilter';
import {
  useGetCategoriesMutation,
  useGetProductsByCategoryIdMutation
} from '@/features/api/appApi';
import { setCategories } from '@/entities/category';
import type {
  Category,
  CategoryPagedQueryResponse,
  Price,
  ProductProjection,
  ProductProjectionPagedQueryResponse
} from '@commercetools/platform-sdk';
import { setPriceRange } from '@/entities/product/model/productsViewSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/app/store';
import {
  defaultCurrencyCode,
  defaultLocale
} from '@/shared/constants/settings';
import PriceFilter from '@/widgets/PriceFilter';
import SizeFilter from '@/widgets/SizeFilter';
import styles from './FiltersContainer.module.scss';

const FiltersContainer = () => {
  const dispatch = useDispatch();
  const [requestCategories] = useGetCategoriesMutation();
  const [requestProductsInCategories] = useGetProductsByCategoryIdMutation();
  const categories = useAppSelector((state) => state.categories.categories);
  const selectedCategory = useAppSelector(
    (state) => state.productsView.selectedCategoryId
  );

  const priceRange = useAppSelector((state) => state.productsView.priceRange);
  const sizes = useAppSelector((state) => state.productsView.sizes);

  const [categorySizes, setCategorySizes] = useState<Map<string, number>>();

  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(999);

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
            sortOption: `name.${defaultLocale} asc`,
            searchText: ''
          }).unwrap();
        sizes.set(category.id, Number(queryResult.total));
      });
      setCategorySizes(sizes);

      function getPriceFromProduct(
        product: ProductProjection,
        currencyCode: string
      ) {
        const prices: Price[] | undefined = product.masterVariant.prices;
        const currencyPrice: Price | undefined = prices?.filter(
          (price: Price) => price.value.currencyCode == currencyCode
        )[0];
        return (
          (currencyPrice?.value.centAmount || 0) /
          10 ** (currencyPrice?.value.fractionDigits || 1)
        );
      }
      let pricesRequestResult: ProductProjectionPagedQueryResponse =
        await requestProductsInCategories({
          categoryId: '',
          pageSize: 1,
          currentPage: 1,
          sortOption: `price asc`,
          searchText: ''
        }).unwrap();
      const min = getPriceFromProduct(
        pricesRequestResult.results[0],
        defaultCurrencyCode
      );
      setMinPrice(min);

      pricesRequestResult = await requestProductsInCategories({
        categoryId: '',
        pageSize: 1,
        currentPage: 1,
        sortOption: `price desc`,
        searchText: ''
      }).unwrap();

      const max = getPriceFromProduct(
        pricesRequestResult.results[0],
        defaultCurrencyCode
      );
      setMaxPrice(max);
      dispatch(setPriceRange({ min, max }));
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
      <PriceFilter
        priceRange={priceRange}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
      <SizeFilter sizes={sizes} />
    </div>
  );
};

export default FiltersContainer;
