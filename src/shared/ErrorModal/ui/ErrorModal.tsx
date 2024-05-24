import styles from './ErrorModal.module.scss';

const ErrorModal = ({
  message,
  isVisible = false
}: {
  message?: string;
  isVisible?: boolean;
}) => {
  return (
    <div className={`${styles.wrapper} ${isVisible ? styles.visible : ''}`}>
      {message || 'Unknown Error!'}
    </div>
  );
};

export default ErrorModal;
