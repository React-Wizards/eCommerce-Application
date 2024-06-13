import styles from './ProductSlider.module.scss';
import { useEffect, useState } from 'react';
import ProductModal from '@/features/ProductModal';
import ImgCarousel from '@/features/ImgCarousel';
import { ProductProjection } from '@commercetools/platform-sdk';

const ProductSlider = (props: { product: ProductProjection }) => {
  const [currentImg, setCurrentImage] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    setImages(
      [props.product.masterVariant, ...props.product.variants]
        .flatMap((v) => v.images)
        .map((i) => i?.url || '')
    );
  }, [props.product]);

  return (
    <div>
      <div className={styles['product-slider-container']}>
        <div className={styles['slider-left']}>
          {images.map((img, ind) => (
            <img
              className={styles['product-img']}
              src={img}
              alt='Product Image'
              key={ind}
              onClick={() => setCurrentImage(ind)}
            />
          ))}
        </div>
        <div>
          <img
            className={styles['product-img-big']}
            src={images[currentImg]}
            alt='Product Image'
            onClick={() => setModalIsOpen(true)}
          />
        </div>
      </div>
      <ImgCarousel classname={'mobile-slider-container'} imgArr={images} />
      <ProductModal
        isOpen={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false);
        }}>
        <ImgCarousel classname={'slider-container'} imgArr={images} />
      </ProductModal>
    </div>
  );
};

export default ProductSlider;
