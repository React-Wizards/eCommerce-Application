import { useDispatch } from 'react-redux';
import styles from './SizeFilter.module.scss';
import { setSizes } from '@/entities/product/model/productsViewSlice';
import { ChangeEvent } from 'react';

const SizeFilter = (props: {
  sizes: { small: boolean; medium: boolean; large: boolean };
}) => {
  const dispatch = useDispatch();

  const onSizeCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSizes({ [e.target.id]: e.target.checked }));
  };

  return (
    <div className={styles.sizeFilterCointainer}>
      <h3 className={styles.sizeFilterHeading}>Size</h3>
      <label className={styles.sizeElement}>
        <input
          type='checkbox'
          name='small'
          id='small'
          checked={props.sizes.small}
          onChange={onSizeCheckHandler}
        />
        Small
      </label>
      <label className={styles.sizeElement}>
        <input
          type='checkbox'
          name='medium'
          id='medium'
          checked={props.sizes.medium}
          onChange={onSizeCheckHandler}
        />
        Medium
      </label>
      <label className={styles.sizeElement}>
        <input
          type='checkbox'
          name='large'
          id='large'
          checked={props.sizes.large}
          onChange={onSizeCheckHandler}
        />
        Large
      </label>
    </div>
  );
};

export default SizeFilter;
