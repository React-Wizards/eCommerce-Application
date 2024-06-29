import { useNavigate } from 'react-router-dom';
import emptyCart from '@/shared/assets/img/empty-cart.png';
import styles from './EmptyCartMessage.module.scss';

const EmptyCartMessage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <img className={styles.image} src={emptyCart} alt='Empty Cart' />
      <p className={styles.title}>Your cart is empty!</p>
      <button
        className={styles.button}
        onClick={() => {
          navigate('/home');
        }}
      >
        Go to shop
      </button>
    </div>
  );
};

export default EmptyCartMessage;
