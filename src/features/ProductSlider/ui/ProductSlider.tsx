import productV2 from '@/shared/assets/img/product-1.2.png';
import productV3 from '@/shared/assets/img/product-1.3.png';
import productV4 from '@/shared/assets/img/product-1.4.png';
import bigImg from '@/shared/assets/img/BD-01.png';
import styles from './ProductSlider.module.scss';
import { useState } from 'react';
import ProductModal from '@/features/ProductModal';
import ImgCarousel from '@/features/ImgCarousel';

const productImgs: string[] = [bigImg, productV2, productV3, productV4];

const ProductSlider = () => {
  const [currentImg, setCurrentImage] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  return (
    <div>
      <div className={styles['product-slider-container']}>
        <div className={styles['slider-left']}>
          <img
            className={styles['product-img']}
            src={bigImg}
            alt='Product Image'
            onClick={() => setCurrentImage(0)}
          />
          <img
            className={styles['product-img']}
            src={productV2}
            alt='Product Image'
            onClick={() => setCurrentImage(1)}
          />
          <img
            className={styles['product-img']}
            src={productV3}
            alt='Product Image'
            onClick={() => setCurrentImage(2)}
          />
          <img
            className={styles['product-img']}
            src={productV4}
            alt='Product Image'
            onClick={() => setCurrentImage(3)}
          />
        </div>
        <div>
          <img
            className={styles['product-img-big']}
            src={productImgs[currentImg]}
            alt='Product Image'
            onClick={() => setModalIsOpen(true)}
          />
        </div>
      </div>
      <ImgCarousel classname={'mobile-slider-container'} imgArr={productImgs} />
      <ProductModal
        isOpen={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false);
        }}>
        <ImgCarousel classname={'slider-container'} imgArr={productImgs} />
      </ProductModal>
    </div>
  );
};

export default ProductSlider;
