import styles from './Loader.module.scss';
import preloader from '../../assets/img/preloader.svg';

const Loader = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.overlay}></div>
      <div className={styles.loader}>
        <img src={preloader} />
      </div>
    </div>
  );
};

export default Loader;
