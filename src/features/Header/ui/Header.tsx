import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import burgerMenuIcon from '@/shared/assets/img/burger-menu-icon.svg';
import logo from '@/shared/assets/img/logo-horiz.svg';
import SearchBox from '@/widgets/SearchBox';
import Controls from '@/features/Controls';
import styles from './Header.module.scss';

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleBurgerMenu = () => {
    setIsOpen((prev: boolean): boolean => !prev);
  };

  return (
    <div className={styles.headerContainer}>
      <nav className={styles.nav}>
        <Link
          to='/home'
          className={styles.homeLink}
          title='Green Shop home page'
        >
          <img className={styles.logo} src={logo} alt='logo' />
          <span className={styles.logoText}>GREENSHOP</span>
        </Link>
      </nav>
      <div className={styles.searchBox}>
        <SearchBox />
      </div>
      <div className={styles.controls__wrapper}>
        <Controls />
      </div>
      <img
        className={styles['burger-icon']}
        src={burgerMenuIcon}
        alt='Burger Menu Icon'
        onClick={() => toggleBurgerMenu()}
      />
      {isOpen && (
        <>
          <FaTimes
            className={styles['close-btn']}
            onClick={() => {
              toggleBurgerMenu();
            }}
          />
          <div className={styles.burger__wrapper}>
            <Controls />
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
