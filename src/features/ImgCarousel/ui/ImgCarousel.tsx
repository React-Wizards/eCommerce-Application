import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDot, RxDotFilled } from 'react-icons/rx';
import { useState } from 'react';
import styles from './ImgCarousel.module.scss';

const ImgCarousel = ({
  classname,
  imgArr
}: {
  classname?: string;
  imgArr: string[];
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? imgArr.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === imgArr.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className={styles[`${classname}`]}>
      <div
        style={{ backgroundImage: `url(${imgArr[currentIndex]})` }}
        className={styles['slider-item']}
      ></div>
      <div className={styles['arrow-left']}>
        <BsChevronCompactLeft size={15} onClick={prevSlide} />
      </div>
      <div className={styles['arrow-right']}>
        <BsChevronCompactRight size={15} onClick={nextSlide} />
      </div>
      <div className={styles['slider-navs']}>
        {imgArr.map((_, slideIndex) => (
          <div
            key={slideIndex}
            className={styles['slider-nav']}
            onClick={() => goToSlide(slideIndex)}
          >
            {slideIndex == currentIndex ? <RxDotFilled /> : <RxDot />}
          </div>
        ))}
      </div>
    </div>
  );
};
export default ImgCarousel;
