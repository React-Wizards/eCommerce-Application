import { useAppSelector } from '@/app/store';
import styles from './ProdViewControls.module.scss';
import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { setSortOption } from '@/entities/product/model/productsViewSlice';
import { defaultLocale } from '@/shared/constants/settings';

const ProdViewControls = () => {
  const dispatch = useDispatch();
  const sortOption = useAppSelector((state) => state.productsView.sortOption);

  const sortOptions = [
    [`name.${defaultLocale} asc`, 'Name ↑'],
    [`name.${defaultLocale} desc`, 'Name ↓'],
    ['price asc', 'Price ↑'],
    ['price desc', 'Price ↓']
  ];

  const onSortChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortOption(e.target.value));
  };

  return (
    <div className={styles.prodViewControls}>
      <span></span>
      <div className={styles.sortSelect}>
        Sort by:
        <select value={sortOption} onChange={onSortChangeHandler}>
          {sortOptions.map((opt, idx) => (
            <option value={opt[0]} key={idx}>
              {opt[1]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProdViewControls;
