import type { RootState } from './store';
import type { Customer } from '@commercetools/platform-sdk';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from '@/pages/LoginPage';
import RegistrationPage from '@/pages/RegistrationPage';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import ProductPage from '@/pages/ProductPage';
import CategoryPage from '@/pages/CategoryPage';

const Router = () => {
  const customer: Customer | null = useSelector(
    (store: RootState): Customer | null => store.customer.user
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/home' replace />} />
        <Route path='/home' element={<Home />} />
        <Route
          path='/login'
          element={customer ? <Navigate to='/home' replace /> : <LoginPage />}
        />
        <Route path='/register' element={<RegistrationPage />} />
        <Route path='/product'>
          <Route index element={<Navigate to='/home' replace />} />
          <Route path=':productKey' element={<ProductPage />} />
        </Route>

        <Route path='/categories'>
          <Route index element={<Navigate to='/home' replace />} />
          <Route path=':categoryId' element={<CategoryPage />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
