import ProductSlider from '@/features/ProductSlider';
import ProductInfo from '@/features/ProductInfo';

const DetailedProduct = () => {
  return (
    <div className='flex gap-[60px] mt-[43px]'>
      <ProductSlider />
      <ProductInfo />
    </div>
  );
};

export default DetailedProduct;
