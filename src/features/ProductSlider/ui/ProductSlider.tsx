import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { ProductProjection } from '@commercetools/platform-sdk';
import { type RootState } from '@/app/store';
import ProductModal from '@/features/ProductModal';
import ImgCarousel from '@/features/ImgCarousel';
import styles from './ProductSlider.module.scss';

const ProductSlider = () => {
  const [currentImg, setCurrentImage] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const product: ProductProjection = useSelector<RootState, ProductProjection>(
    (store: RootState): ProductProjection => store.selectedProduct.product!
  );
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    setImages(
      [product.masterVariant, ...product.variants]
        .flatMap((v) => v.images)
        .map((i) => i?.url || '')
    );
  }, [product]);

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
        }}
      >
        <ImgCarousel classname={'slider-container'} imgArr={images} />
      </ProductModal>
    </div>
  );
};

export default ProductSlider;
