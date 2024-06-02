import styles from './PriceRange.module.scss';
import Button from '@/shared/Button';
import Slider from 'react-slider';
import { useState } from 'react';

const MIN = 39;
const MAX = 1230;

const PriceRange = () => {
  const [values, setValues] = useState([MIN, MAX]);
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Price</h4>
      <div className={styles['range-container']}>
        <Slider
          className={styles.slider}
          value={values}
          min={MIN}
          max={MAX}
          onChange={setValues}
        />
        <div className={styles['values']}>
          <p>
            Price: <span className={styles['min-range']}>${values[0]}</span>
            <span className='text-[#46A358] font-bold'> - </span>
            <span className={styles['max-range']}>${values[1]}</span>
          </p>
        </div>
      </div>
      <div className='w-[90px]'>
        <Button text={'Filter'} />
      </div>
    </div>
  );
};

export default PriceRange;
