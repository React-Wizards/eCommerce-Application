import ProdViewControls from '@/widgets/ProdViewControls';
import ProductsList from '@/widgets/ProductsList';
import ProdPaginator from '@/widgets/ProdPaginator';
import { useGetProductsByCategoryIdMutation } from '@/features/api/appApi';
import { type RootState, useAppSelector } from '@/app/store';
import { setProducts } from '@/entities/product';
import { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  setCurrentPage,
  setTotalItemsCount
} from '@/entities/product/model/productsViewSlice';
import {
  useGetActiveCartMutation,
  useCreateActiveCartMutation
} from '@/features/api/meApi';
import Loader from '@/shared/Loader';
import styles from './ProductsContainer.module.scss';

const ProductsContainer = () => {
  const currentPage = useAppSelector((state) => state.productsView.currentPage);
  const pageSize = useAppSelector((state) => state.productsView.pageSize);
  const totalItemsCount = useAppSelector(
    (state) => state.productsView.totalItemsCount
  );
  const sortOption = useAppSelector((state) => state.productsView.sortOption);
  const searchText: string = useAppSelector<RootState, string>(
    (state: RootState): string => state.productsView.searchText
  );

  const dispatch = useDispatch();
  const products = useAppSelector((state) => state.products.products);
  const [requestProducts, { isLoading }] = useGetProductsByCategoryIdMutation();
  const selectedCategory = useAppSelector(
    (state) => state.productsView.selectedCategoryId
  );
  const priceRange = useAppSelector((state) => state.productsView.priceRange);
  const sizes = useAppSelector((state) => state.productsView.sizes);

  const setCurrentPageHandler = (p: number) => {
    dispatch(setCurrentPage(p));
  };

  const cart = useAppSelector((state) => state.cart.cart);
  const [requestCart] = useGetActiveCartMutation();
  const [createCart] = useCreateActiveCartMutation();

  useEffect(() => {
    async function fetchData() {
      const result: ProductProjectionPagedQueryResponse = await requestProducts(
        {
          categoryId: selectedCategory,
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
    fetchData();

    async function fetchActiveCart() {
      try {
        const activeCart: Cart = await requestCart().unwrap();
        dispatch(setCart(activeCart));
      } catch (error: unknown) {
        if (error && error.status === 404) {
          const newCart: Cart = await createCart().unwrap();
          dispatch(setCart(newCart));
        }
      }
    }

    fetchActiveCart();
  }, [
    selectedCategory,
    currentPage,
    sortOption,
    searchText,
    requestProducts,
    pageSize,
    priceRange,
    sizes,
    dispatch,
    requestCart,
    createCart
  ]);

  console.log(cart);

  return (
    <div className={styles.productsContainer}>
      {isLoading ? <Loader /> : null}
      <ProdViewControls />
      <ProductsList
        products={products}
        customer={props.customer}
        cart={cart}></ProductsList>
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
