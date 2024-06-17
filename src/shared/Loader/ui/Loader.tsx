import styles from './Loader.module.scss';
import preloader from '@/shared/assets/img/preloader.svg';

const Loader = () => {
  return (
    <div className={styles.overlay}>
      <img className={styles.preloader} src={preloader} />
    </div>
  );
};

export default Loader;
