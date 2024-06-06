import styles from './ProductSlider.module.scss';
import { useState, useEffect } from 'react';
import ProductModal from '@/features/ProductModal';
import ImgCarousel from '@/features/ImgCarousel';
import { useAppSelector } from '@/app/store';
import { Image } from '@commercetools/platform-sdk';
import { useLocation } from 'react-router-dom';
import { useGetProductByKeyMutation } from '@/features/api/appApi';
import { ProductProjection } from '@commercetools/platform-sdk';
import { setProduct } from '@/entities/selectedProduct';
import { useDispatch } from 'react-redux';

const ProductSlider = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const dispatch = useDispatch();

  const location = useLocation();
  const urlParamsArr: string[] = location.pathname.split('/');
  const urlParamsArrLen: number = urlParamsArr.length;
  const productKey = urlParamsArr[urlParamsArrLen - 1];

  const [requestProductByKey] = useGetProductByKeyMutation();

  const product = useAppSelector((state) => state.selectedProduct.product);

  useEffect(() => {
    async function fetchData() {
      const result: ProductProjection =
        await requestProductByKey(productKey).unwrap();
      dispatch(setProduct(result));
    }
    fetchData();
  }, [productKey]);

  return (
    <div>
      <div className={styles['product-slider-container']}>
        <div className={styles['slider-left']}>
          <img
            className={styles['product-img']}
            src={(product?.masterVariant.images as Image[])[0].url}
            alt='Product Image'
          />
        </div>
        <div>
          <img
            className={styles['product-img-big']}
            src={(product?.masterVariant.images as Image[])[0].url}
            alt='Product Image'
            onClick={() => setModalIsOpen(true)}
          />
        </div>
      </div>
      <ImgCarousel
        classname={'mobile-slider-container'}
        imgArr={[(product?.masterVariant.images as Image[])[0].url]}
      />
      <ProductModal
        isOpen={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false);
        }}>
        <ImgCarousel
          classname={'slider-container'}
          imgArr={[(product?.masterVariant.images as Image[])[0].url]}
        />
      </ProductModal>
    </div>
  );
};

export default ProductSlider;
