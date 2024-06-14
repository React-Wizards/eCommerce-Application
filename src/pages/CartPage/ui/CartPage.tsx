import { useNavigate } from 'react-router-dom';
import styles from './CartPage.module.scss';

const CartPage = () => {
  const navigate = useNavigate();

  const goHome = (): void => {
    navigate('/home', {
      replace: true
    });
  };

  const goBack = (): void => {
    navigate(-1);
  };

  return (
      <div className={styles.pageWrapper}>
        <h1 className={styles.title}>Cart checkout...</h1>

        <div className={styles.navigation}>
          <button
            className={styles.navigation__back}
            onClick={() => {
              goBack();
            }}>
            Go back
          </button>
          <button
            className={styles.navigation__home}
            onClick={() => {
              goHome();
            }}>
            Home
          </button>
        </div>
      </div>
  );
};

export default CartPage;
