import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import { Category, ProductProjection } from '@commercetools/platform-sdk';
import { useAppSelector } from '@/app/store';
import { defaultLocale } from '@/shared/constants/settings';
import { useGetCategoryByIdMutation } from '@/features/api/appApi';
import { useEffect, useState } from 'react';

const Breadcrumbs = (props: { product: ProductProjection }) => {
  const categories = useAppSelector((state) => state.categories.categories);
  const [requestCategoryById] = useGetCategoryByIdMutation();
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    async function fetchData(categoryId: string) {
      return await requestCategoryById(categoryId).unwrap();
    }

    if (props.product?.categories) {
      if (categories.length) {
        setCategory(
          categories.filter(
            (cat) => cat.id == props.product.categories[0].id
          )[0]
        );
      } else {
        fetchData(props.product.categories[0].id).then((cat) =>
          setCategory(cat)
        );
      }
    }
  }, [props, categories, requestCategoryById]);

  return (
    <div className={styles.breadcrumbs}>
      <div className={styles.crumb}>
        <Link to={'/home'}> Home </Link>
      </div>
      {category && (
        <div className={styles.crumb}>
          <Link to={`/categories/${category.id}`}>
            {category.name[defaultLocale]}
          </Link>
        </div>
      )}
      <div className={styles.inactiveCrumb}>
        {props.product.name[defaultLocale]}
      </div>
    </div>
  );
};

export default Breadcrumbs;
