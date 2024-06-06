import styles from './ShopPage.module.scss';
import homeStyles from '@/pages/Home/ui/Home.module.scss';
import Breadcrumbs from '@/features/Breadcrumbs';
import { Link } from 'react-router-dom';
import logo from '@/shared/assets/img/logo-horiz.svg';
import type { Customer } from '@commercetools/platform-sdk';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import type { RootState } from '@/app/store';
import { logout } from '@/entities/customer';
import DetailedProduct from '@/widgets/DetailedProduct';
import { useState } from 'react';
import burgerMenuIcon from '@/shared/assets/img/burger-menu-icon.svg';
import { FaTimes } from 'react-icons/fa';

const ShopPage = () => {
  const customer: Customer | null = useSelector(
    (store: RootState): Customer | null => store.customer.user
  );
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={homeStyles.container}>
        <nav className={homeStyles.nav}>
          <Link to='/home'>
            <img className={homeStyles.logo} src={logo} alt='logo' />
          </Link>
          <div
            className={`${homeStyles['page-links']} ${homeStyles['hidden']}`}>
            <Link className={homeStyles['nav-item']} to='/home'>
              Home
            </Link>
            <Link className={homeStyles['nav-item']} to='/shop'>
              Shop
            </Link>
          </div>
          <div className={homeStyles.links}>
            {customer ? (
              <button
                className={homeStyles.login}
                onClick={(): void => {
                  dispatch(logout());
                }}>
                Logout
              </button>
            ) : (
              <Link className={homeStyles.login} to='/login'>
                Login
              </Link>
            )}
            <Link className={homeStyles.register} to='/register'>
              Register
            </Link>
          </div>
          <img
            className={homeStyles['burger-icon']}
            src={burgerMenuIcon}
            alt='Burger Menu Icon'
            onClick={() => toggleBurgerMenu()}
          />
        </nav>
        <Breadcrumbs />
        <DetailedProduct />
        <div className={styles.container}>
          <h2 className={styles.title}>Product Description</h2>
          <div className={styles['description-container']}>
            <p className={styles['description-text']}>
              The ceramic cylinder planters come with a wooden stand to help
              elevate your plants off the ground. The ceramic cylinder planters
              come with a wooden stand to help elevate your plants off the
              ground. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nam fringilla augue nec est tristique auctor. Donec non est at
              libero vulputate rutrum. Morbi ornare lectus quis justo gravida
              semper. Nulla tellus mi, vulputate adipiscing cursus eu, suscipit
              id nulla.
            </p>
            <p className={styles['description-text']}>
              Pellentesque aliquet, sem eget laoreet ultrices, ipsum metus
              feugiat sem, quis fermentum turpis eros eget velit. Donec ac
              tempus ante. Fusce ultricies massa massa. Fusce aliquam, purus
              eget sagittis vulputate, sapien libero hendrerit est, sed commodo
              augue nisi non neque. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed tempor, lorem et placerat vestibulum, metus
              nisi posuere nisl, in accumsan elit odio quis mi. Cras neque
              metus, consequat et blandit et, luctus a nunc. Etiam gravida
              vehicula tellus, in imperdiet ligula euismod eget. The ceramic
              cylinder planters come with a wooden stand to help elevate your
              plants off the ground.
            </p>
            <h3 className={styles.subtitle}>Living room:</h3>
            <p className={styles['description-text']}>
              The ceramic cylinder planters come with a wooden stand to help
              elevate your plants off the ground. The ceramic cylinder planters
              come with a wooden stand to help elevate your plants off the
              ground. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <h3 className={styles.subtitle}>Dining room:</h3>
            <p className={styles['description-text']}>
              The benefits of houseplants are endless. In addition to cleaning
              the air of harmful toxins, they can help to improve your mood,
              reduce stress and provide you with better sleep. Fill every room
              of your home with houseplants and their restorative qualities will
              improve your life.
            </p>
            <h3 className={styles.subtitle}>Office:</h3>
            <p className={styles['description-text']}>
              The ceramic cylinder planters come with a wooden stand to help
              elevate your plants off the ground. The ceramic cylinder planters
              come with a wooden stand to help elevate your plants off the
              ground. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={homeStyles['burger-menu']}>
          <FaTimes
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              color: '#46A358',
              cursor: 'pointer'
            }}
            onClick={() => {
              setIsOpen(false);
            }}
          />
          <div className={homeStyles['page-links-mobile']}>
            <Link className={homeStyles['nav-item']} to='/home'>
              Home
            </Link>
            <Link className={homeStyles['nav-item']} to='/home/shop'>
              Shop
            </Link>
          </div>
          <div className={homeStyles['links-mobile']}>
            {customer ? (
              <button
                className={homeStyles.login}
                onClick={(): void => {
                  dispatch(logout());
                }}>
                Logout
              </button>
            ) : (
              <Link className={homeStyles.login} to='/login'>
                Login
              </Link>
            )}
            <Link className={homeStyles.register} to='/register'>
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
