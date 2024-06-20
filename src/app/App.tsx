import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { DiscountCodePagedQueryResponse } from '@commercetools/platform-sdk';
import TokenStorage from '@/shared/api/tokenStorage';
import Container from '@/shared/Container';
import {
  useGetActiveCartMutation,
  useGetProfileMutation
} from '@/features/api/meApi';
import { useGetDiscountsMutation } from '@/features/api/appApi';
import { login } from '@/entities/customer';
import { setCart } from '@/entities/cart';
import { setDiscounts } from '@/entities/discounts';
import Router from './Router';
import './App.scss';

const App = () => {
  const tokenStorage = new TokenStorage('ecom');
  const [requestProfile] = useGetProfileMutation();
  const [getActiveCart] = useGetActiveCartMutation();
  const [getDiscounts] = useGetDiscountsMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const token = tokenStorage.getItem('user-token');
      const responseDiscounts: DiscountCodePagedQueryResponse =
        await getDiscounts().unwrap();

      if (token) {
        dispatch(login(await requestProfile().unwrap()));
        dispatch(setCart(await getActiveCart().unwrap()));
      }

      dispatch(setDiscounts(responseDiscounts.results));
    }

    fetchData();
  }, []);

  return (
    <Container>
      <Router />
    </Container>
  );
};

export default App;
