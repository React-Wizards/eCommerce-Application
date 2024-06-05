import styles from './Categories.module.scss';
import { Category } from '@commercetools/platform-sdk';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import getAppToken from '@/shared/api/accessToken';
import { RootState } from '@/app/store';
import PriceRange from '@/widgets/PriceRange';
import Size from '@/widgets/Size';
import { setCategories } from '@/entities/category/model/categorySlice';

const projectKey = import.meta.env.VITE_PROJECT_KEY;
const apiURL = import.meta.env.VITE_API_URL;

const Categories = ({
  additionalClassname
}: {
  additionalClassname?: string;
}) => {
  const [cookies, setCookie] = useCookies(['AppToken']);
  const [appToken, setAppToken] = useState<string>('');
  const dispatch = useDispatch();

  const fetchAppToken = async () => {
    try {
      if (cookies['AppToken'] !== 'undefined') {
        setAppToken(cookies['AppToken']);
      } else {
        const token = await getAppToken();
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
    const categoriesResponse = await axios.get(
      `${apiURL}/${projectKey}/categories`,
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
        const categoryData = await fetchCategories();
        dispatch(setCategories(categoryData));
        console.log(categoryData);
      } catch (error) {
        console.error('Error setting categories:', error);
      }
    };

    getCategories();
  }, []);

  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  return (
    <aside
      className={`${additionalClassname ? additionalClassname : styles.container}`}>
      <div>
        <h4 className={styles.title}>Categories</h4>
        <ul className={styles['categories-list']}>
          <li className={styles['categories-item']}>
            <Link to='/home/all'>All</Link>
            {/* <span>()</span> */}
          </li>
          {categories.map((category) => (
            <li className={styles['categories-item']} key={category.id}>
              <Link to={'/home/category/' + category.slug['en-US']}>
                {category.name['en-US']}
              </Link>
              {/* <span>()</span> */}
            </li>
          ))}
        </ul>
      </div>
      <PriceRange />
      <Size />
    </aside>
  );
};

export default Categories;
