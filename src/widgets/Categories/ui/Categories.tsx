import styles from './Categories.module.scss';
import { Category } from '@commercetools/platform-sdk';
import axios, { AxiosResponse } from 'axios';
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAuthToken } from '@/shared/api';
import { RootState } from '@/app/store';
import { setCategories } from '@/entities/category/model/categorySlice';
import { env } from '@/shared/constants';

interface CategoryResponse {
  results: Category[];
}

const Categories = () => {
  const [cookies, setCookie] = useCookies(['AppToken']);
  const [appToken, setAppToken] = useState<string>('');
  const dispatch = useDispatch();

  const fetchAppToken = async () => {
    try {
      if (cookies['AppToken'] !== 'undefined') {
        setAppToken(cookies['AppToken']);
      } else {
        const token = await getAuthToken();
        setCookie('AppToken', token);
        setAppToken(token);
      }
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  };

  useEffect(() => {
    fetchAppToken();
  }, []);

  const fetchCategories = async (): Promise<Array<Category>> => {
    const categoriesResponse: AxiosResponse<CategoryResponse> = await axios.get(
      `${env.API_URL}/${env.PROJECT_KEY}/categories`,
      {
        headers: {
          Authorization: `Bearer ${appToken}`
        }
      }
    );
    return categoriesResponse.data.results;
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoryData: Category[] = await fetchCategories();
        dispatch(setCategories(categoryData));
      } catch (error) {
        console.error('Error setting categories:', error);
      }
    };

    getCategories();
  }, []);

  const categories: Category[] = useSelector<RootState, Category[]>(
    (state: RootState): Category[] => state.categories.categories
  );

  return (
    <aside className={styles.container}>
      <div>
        <h4 className={styles.title}>Categories</h4>
        <ul className={styles['categories-list']}>
          <li className={styles['categories-item']}>
            <Link to='/home/all'>All</Link>
          </li>
          {categories.map((category) => (
            <li className={styles['categories-item']} key={category.id}>
              <Link to={'/home/category/' + category.slug['en-US']}>
                {category.name['en-US']}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Categories;
