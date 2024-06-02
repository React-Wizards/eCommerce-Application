import { useLocation, Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

const breadcrumbData: { [key: string]: string } = {
  home: 'Home',
  shop: 'Shop',
  category: 'Category',
  all: 'All Products'
};

const Breadcrumbs = () => {
  const location = useLocation();
  let currentLink = '';

  const crumbs = location.pathname
    .split('/')
    .filter((crumb) => crumb !== '')
    .map((crumb) => {
      currentLink += `/${crumb}`;

      return (
        <div className={styles.crumb} key={crumb}>
          <Link to={currentLink}>
            {breadcrumbData[crumb] ||
              crumb
                .split('-')
                .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
                .join(' ')}
          </Link>
        </div>
      );
    });
  return <div className={styles.breadcrumbs}>{crumbs}</div>;
};

export default Breadcrumbs;
