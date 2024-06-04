// import productV1 from '@/shared/assets/img/product-1.1.png';
import productV2 from '@/shared/assets/img/product-1.2.png';
import productV3 from '@/shared/assets/img/product-1.3.png';
import productV4 from '@/shared/assets/img/product-1.4.png';
import bigImg from '@/shared/assets/img/BD-01.png';
import styles from './ProductSlider.module.scss';
import { useState } from 'react';
import ProductModal from '@/features/ProductModal';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

const productImgs: string[] = [bigImg, productV2, productV3, productV4];

const ProductSlider = () => {
  const [currentImg, setCurrentImage] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? productImgs.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === productImgs.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slide: string, slideIndex: number) => {
    setCurrentIndex(slideIndex);
    console.log(slide);
  };
  return (
    <div>
      <div className='flex items-center gap-4'>
        <div className='flex flex-col gap-4'>
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
      <ProductModal
        isOpen={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false);
        }}>
        <div className={styles['slider-container']}>
          <div
            style={{ backgroundImage: `url(${productImgs[currentIndex]})` }}
            className={styles['slider-item']}></div>
          <div className={styles['arrow-left']}>
            <BsChevronCompactLeft size={20} onClick={prevSlide} />
          </div>
          <div className={styles['arrow-right']}>
            <BsChevronCompactRight size={20} onClick={nextSlide} />
          </div>
          <div className={styles['slider-navs']}>
            {productImgs.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                className={styles['slider-nav']}
                onClick={() => goToSlide(slide, slideIndex)}>
                <RxDotFilled />
              </div>
            ))}
          </div>
        </div>
      </ProductModal>
    </div>
  );
};

export default ProductSlider;
