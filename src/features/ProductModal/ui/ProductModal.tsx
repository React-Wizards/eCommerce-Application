import styles from './ProductModal.module.scss';
import Modal from 'react-modal';

const ProductModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      overlayClassName={styles['modal-overlay']}
      className={styles['modal-window']}
      ariaHideApp={false}
      onRequestClose={() => onClose()}>
      <button className={styles['modal-close-btn']} onClick={() => onClose()}>
        X
      </button>
      {children}
    </Modal>
  );
};

export default ProductModal;
