import CartItem from '@/entities/CartItem';
import { useEffect } from 'react';
import axios from 'axios';
import { env } from '@/shared/constants';
import styles from './CartList.module.scss';
import TokenStorage from '@/shared/api/tokenStorage';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { Customer } from '@commercetools/platform-sdk';
import image1 from '@/shared/assets/img/product-1.1.png';
import image2 from '@/shared/assets/img/product-1.2.png';
import image3 from '@/shared/assets/img/product-1.3.png';

interface IBasket {
  id: number;
  name: string;
  price: number;
  size: string;
  image: string;
  quantity: number;
}

const CartList = () => {
  const testBasket: IBasket[] = [
    {
      id: 0,
      name: 'Barberton Daisy',
      price: 119,
      size: 'M',
      image: image1,
      quantity: 2
    },
    {
      id: 1,
      name: 'Blushing Bromeliad',
      price: 139,
      size: 'S',
      image: image2,
      quantity: 6
    },
    {
      id: 2,
      name: 'Aluminum Plant',
      price: 179,
      size: 'L',
      image: image3,
      quantity: 9
    }
  ];
  const customer: Customer = useSelector<RootState, Customer>(
    (store: RootState): Customer => store.customer.user!
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!customer) {
        return;
      }

      try {
        const tokenStorage = new TokenStorage('ecom');
        const token: string | undefined = tokenStorage.getItem('user-token');

        if (!token) {
          return;
        }

        const url: string = `${env.API_URL}/${env.PROJECT_KEY}/carts/customer-id=${customer.id}`;
      } catch (error: unknown) {
        console.error(error);
      }
    };

    fetchData();
  }, [customer]);

  return (
    <>
      <table className={styles.cart}>
        <thead>
          <tr>
            <td>Products</td>
            <td>Price</td>
            <td>Quantity</td>
            <td>Total</td>
          </tr>
        </thead>
        <tbody>
          {testBasket.map(({ id, ...basket }: IBasket) => (
            <CartItem key={id} basket={basket} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CartList;
