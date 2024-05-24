import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.scss';

const NotFound = () => {
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
    <div className={styles.window}>
      <div className={styles.wrapper}>
        <span className={styles.title}>404</span>
        <span className={styles.subtitle}>Oops! Something wrong…</span>
        <span className={styles.description}>
          Curabitur blandit tempus porttitor. Cum sociis natoque penatibus et
          magnis dis parturient montes, nascetur ridiculus mus. Maecenas
          faucibus mollis interdum.
        </span>
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
    </div>
  );
};

export default NotFound;
