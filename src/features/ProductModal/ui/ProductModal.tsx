import Modal from 'react-modal';
import { IoCloseCircleOutline } from 'react-icons/io5';
import styles from './ProductModal.module.scss';

const ProductModal = ({
  isOpen,
  onClose,
  children
}: {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      overlayClassName={styles['modal-overlay']}
      className={styles['modal-window']}
      ariaHideApp={false}
      onRequestClose={() => onClose()}
    >
      <IoCloseCircleOutline
        className={styles['modal-close-btn']}
        onClick={() => onClose()}
      />
      {children}
    </Modal>
  );
};

export default ProductModal;
