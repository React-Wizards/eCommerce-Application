import ProductSlider from '@/features/ProductSlider';
import ProductInfo from '@/features/ProductInfo';

const DetailedProduct = () => {
  return (
    <div className='flex gap-[100px] mt-[43px]'>
      <ProductSlider />
      <ProductInfo />
    </div>
  );
};

export default DetailedProduct;
