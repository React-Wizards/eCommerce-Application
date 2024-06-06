import type { RootState } from './store';
import type { Customer } from '@commercetools/platform-sdk';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from '@/pages/LoginPage';
import RegistrationPage from '@/pages/RegistrationPage';
import ShopPage from '@/pages/Shop';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';

const Router = () => {
  const customer: Customer | null = useSelector(
    (store: RootState): Customer | null => store.customer.user
  );
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const products = useSelector((state: RootState) => state.products.products);
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
        <Route path='/shop' element={<ShopPage />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/home/all' element={<Home />} />
        <Route path='/home/product' element={<Home />} />
        <Route path='/home/category' element={<Home />} />
        {categories.map((category) => (
          <Route
            path={'/home/category/' + category.slug['en-US']}
            key={category.id}
            element={<Home />}
          />
        ))}
        {products.map((product) => (
          <Route
            path={'/home/product/' + product.key}
            key={product.id}
            element={<ShopPage />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
