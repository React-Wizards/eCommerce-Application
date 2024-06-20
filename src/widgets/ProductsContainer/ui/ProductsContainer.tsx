import ProdViewControls from '@/widgets/ProdViewControls';
import ProductsList from '@/widgets/ProductsList';
import ProdPaginator from '@/widgets/ProdPaginator';
import { useGetProductsByCategoryIdMutation } from '@/features/api/appApi';
import { type RootState, useAppSelector } from '@/app/store';
import { setProducts } from '@/entities/product';
import type { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  type ProductsViewState,
  setCurrentPage,
  setTotalItemsCount
} from '@/entities/product/model/productsViewSlice';
import {
  useGetActiveCartMutation,
  useCreateActiveCartMutation
} from '@/features/api/meApi';
import Loader from '@/shared/Loader';
import { setCart } from '@/entities/cart';
import styles from './ProductsContainer.module.scss';

const ProductsContainer = () => {
  const {
    selectedCategoryId,
    totalItemsCount,
    currentPage,
    sortOption,
    searchText,
    priceRange,
    pageSize,
    sizes
  }: ProductsViewState = useAppSelector<RootState, ProductsViewState>(
    (store): ProductsViewState => store.productsView
  );
  const dispatch = useDispatch();
  const [requestProducts, { isLoading }] = useGetProductsByCategoryIdMutation();

  const setCurrentPageHandler = (p: number) => {
    dispatch(setCurrentPage(p));
  };

  const [getCart] = useGetActiveCartMutation();
  const [createCart] = useCreateActiveCartMutation();

  useEffect(() => {
    async function fetchData() {
      const result: ProductProjectionPagedQueryResponse = await requestProducts(
        {
          categoryId: selectedCategoryId,
          pageSize,
          currentPage,
          sortOption,
          searchText,
          priceRange,
          sizes
        }
      ).unwrap();
      dispatch(setProducts(result.results));
      dispatch(setTotalItemsCount(result.total || 0));
    }

    async function fetchActiveCart() {
      try {
        dispatch(setCart(await getCart().unwrap()));
      } catch (error: unknown) {
        if (
          typeof error === 'object' &&
          error &&
          'status' in error &&
          error.status === 404
        ) {
          dispatch(setCart(await createCart().unwrap()));
        }
      }
    }

    fetchData();
    fetchActiveCart();
  }, [
    selectedCategoryId,
    currentPage,
    sortOption,
    searchText,
    requestProducts,
    pageSize,
    priceRange,
    sizes,
    dispatch,
    getCart,
    createCart
  ]);

  return (
    <div className={styles.productsContainer}>
      {isLoading && <Loader />}
      <ProdViewControls />
      <ProductsList></ProductsList>
      <ProdPaginator
        currentPage={currentPage}
        totalItemsCount={totalItemsCount}
        pageSize={pageSize}
        onPageButtonClickHandler={setCurrentPageHandler}
      />
    </div>
  );
};

export default ProductsContainer;
