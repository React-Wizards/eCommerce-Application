import { Navigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedCategoryId } from '@/entities/product/model/productsViewSlice';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  dispatch(setSelectedCategoryId(String(categoryId)));

  return <Navigate to='/home' replace />;
};

export default CategoryPage;
