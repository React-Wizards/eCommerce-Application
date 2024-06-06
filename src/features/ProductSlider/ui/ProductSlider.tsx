import styles from './ProductSlider.module.scss';
import { useState } from 'react';
import ProductModal from '@/features/ProductModal';
import ImgCarousel from '@/features/ImgCarousel';
import { useAppSelector } from '@/app/store';
import { Image } from '@commercetools/platform-sdk';

const ProductSlider = () => {
  const [currentImg, setCurrentImage] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const products = useAppSelector((state) => state.products.products);

  return (
    <div>
      <div className={styles['product-slider-container']}>
        <div className={styles['slider-left']}>
          <img
            className={styles['product-img']}
            src={(products[0].masterVariant.images as Image[])[0].url}
            alt='Product Image'
            onClick={() => setCurrentImage(0)}
          />
          <img
            className={styles['product-img']}
            src={(products[1].masterVariant.images as Image[])[0].url}
            alt='Product Image'
            onClick={() => setCurrentImage(0)}
          />
          <img
            className={styles['product-img']}
            src={(products[2].masterVariant.images as Image[])[0].url}
            alt='Product Image'
            onClick={() => setCurrentImage(2)}
          />
          <img
            className={styles['product-img']}
            src={(products[3].masterVariant.images as Image[])[0].url}
            alt='Product Image'
            onClick={() => setCurrentImage(3)}
          />
        </div>
        <div>
          <img
            className={styles['product-img-big']}
            src={(products[currentImg].masterVariant.images as Image[])[0].url}
            alt='Product Image'
            onClick={() => setModalIsOpen(true)}
          />
        </div>
      </div>
      <ImgCarousel classname={'mobile-slider-container'} imgArr={['']} />
      <ProductModal
        isOpen={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false);
        }}>
        <ImgCarousel classname={'slider-container'} imgArr={['']} />
      </ProductModal>
    </div>
  );
};

export default ProductSlider;
