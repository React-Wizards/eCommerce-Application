import Router from './Router';
import './App.scss';
import TokenStorage from '@/shared/api/tokenStorage';
import { Customer } from '@commercetools/platform-sdk';
import { useDispatch } from 'react-redux';
import { login } from '@/entities/customer';
import { useGetProfileMutation } from '@/features/api/meApi';
import { useEffect } from 'react';

const App = () => {
  const tokenStorage = new TokenStorage('ecom');
  const dispatch = useDispatch();
  const [requestProfile /* , { isLoading } */] = useGetProfileMutation();

  useEffect(() => {
    async function fetchData() {
      const token = tokenStorage.getItem('user-token');
      if (token) {
        const profile = (await requestProfile().unwrap()) as Customer;
        dispatch(login(profile));
        // TODO: add try...catch
      }
    }
    fetchData();
  }, []);

  return <Router />;
};

export default App;
