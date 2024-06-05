import ProdViewControls from '@/widgets/ProdViewControls';
import styles from './ProductsContainer.module.scss';
import ProductsList from '@/widgets/ProductsList';
import ProdPaginator from '@/widgets/ProdPaginator';
import { useGetProductsByCategoryIdMutation } from '@/features/api/appApi';
import { useAppSelector } from '@/app/store';
import { setProducts } from '@/entities/product';
import { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  setCurrentPage,
  setTotalItemsCount
} from '@/entities/product/model/productsViewSlice';

const ProductsContainer = () => {
  const currentPage = useAppSelector((state) => state.productsView.currentPage);
  const pageSize = useAppSelector((state) => state.productsView.pageSize);
  const totalItemsCount = useAppSelector(
    (state) => state.productsView.totalItemsCount
  );
  const sortOption = useAppSelector((state) => state.productsView.sortOption);

  const dispatch = useDispatch();
  const products = useAppSelector((state) => state.products.products);
  const [requestProducts /* , { isProductsLoading } */] =
    useGetProductsByCategoryIdMutation();
  const selectedCategory = useAppSelector(
    (state) => state.productsView.selectedCategoryId
  );

  const setCurrentPageHandler = (p: number) => {
    dispatch(setCurrentPage(p));
  };

  useEffect(() => {
    async function fetchData() {
      const result = (await requestProducts({
        categoryId: selectedCategory,
        pageSize,
        currentPage,
        sortOption
      })) as {
        data: ProductProjectionPagedQueryResponse;
      };
      dispatch(setProducts(result.data.results));
      dispatch(setTotalItemsCount(result.data.total || 0));
    }
    fetchData();
  }, [selectedCategory, currentPage, sortOption]);

  return (
    <div className={styles.productsContainer}>
      <ProdViewControls />
      <ProductsList products={products}></ProductsList>
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
