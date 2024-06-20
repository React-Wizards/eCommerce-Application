import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type {
  Cart,
  DiscountCodePagedQueryResponse
} from '@commercetools/platform-sdk';
import TokenStorage from '@/shared/api/tokenStorage';
import Container from '@/shared/Container';
import {
  useCreateActiveCartMutation,
  useGetActiveCartMutation,
  useGetProfileMutation
} from '@/features/api/meApi';
import { useGetDiscountsMutation } from '@/features/api/appApi';
import { login } from '@/entities/customer';
import { setCart } from '@/entities/cart';
import { setDiscounts } from '@/entities/discounts';
import Router from './Router';
import './App.scss';
import {
  TokenResponse,
  useAnonymousTokenMutation
} from '@/features/api/authApi';

const App = () => {
  const tokenStorage = new TokenStorage('ecom');
  const [requestProfile] = useGetProfileMutation();
  const [getActiveCart] = useGetActiveCartMutation();
  const [getDiscounts] = useGetDiscountsMutation();
  const [getAnonymousToken] = useAnonymousTokenMutation();
  const [createActiveCart] = useCreateActiveCartMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const token = tokenStorage.getItem('user-token');
      const responseDiscounts: DiscountCodePagedQueryResponse =
        await getDiscounts().unwrap();

      if (token) {
        try {
          dispatch(login(await requestProfile().unwrap()));
          dispatch(setCart(await getActiveCart().unwrap()));
        } catch (error: unknown) {
          console.error(error);
        }
      } else {
        try {
          const anonymousToken: TokenResponse =
            await getAnonymousToken().unwrap();

          tokenStorage.setItem(
            'anonymous-user-token',
            anonymousToken.access_token,
            anonymousToken.expires_in
          );

          if (anonymousToken.refresh_token) {
            tokenStorage.setItem(
              'anonymous-user-refresh-token',
              anonymousToken.refresh_token,
              17280000
            );
          }

          const anonymousCart: Cart = await createActiveCart().unwrap();

          dispatch(setCart(anonymousCart));
        } catch (error: unknown) {
          console.error(error);
        }
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
