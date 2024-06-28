import { useDispatch } from 'react-redux';
import { setPriceRange } from '@/entities/product/model/productsViewSlice';
import ReactSlider from 'react-slider';
import { useEffect, useState } from 'react';
import Button from '@/shared/Button';
import styles from './PriceFilter.module.scss';

const PriceFilter = (props: {
  priceRange: { min: number; max: number };
  minPrice: number;
  maxPrice: number;
}) => {
  const dispatch = useDispatch();

  const [values, setValues] = useState([0, 999]);

  const onFilterApplyHandler = () => {
    dispatch(setPriceRange({ min: values[0], max: values[1] }));
  };

  useEffect(() => {
    setValues([props.priceRange.min, props.priceRange.max]);
  }, [props]);

  return (
    <div className={styles.priceFilterCointainer}>
      <h3 className={styles.priceFilterHeading}>Price Range</h3>
      <ReactSlider
        className={styles.slider}
        value={values}
        min={props.minPrice}
        max={props.maxPrice}
        onChange={setValues}
      />
      <div className={styles['values']}>
        <span>Price:</span>
        <span className={styles.valuesRange}>
          {`  $${values[0]} - $${values[1]}`}
        </span>
      </div>
      <div className='w-[90px]'>
        <Button text={'Filter'} callback={onFilterApplyHandler} />
      </div>
    </div>
  );
};

export default PriceFilter;
