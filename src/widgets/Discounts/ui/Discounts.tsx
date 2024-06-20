import type { RootState } from '@/app/store';
import type { DiscountCode } from '@commercetools/platform-sdk';
import { useSelector } from 'react-redux';
import styles from './Discounts.module.scss';
import DiscountItem from '@/entities/DiscountItem';

const Discounts = () => {
  const discounts: DiscountCode[] = useSelector<RootState, DiscountCode[]>(
    (store: RootState): DiscountCode[] => store.discounts.discounts
  );
  console.log(discounts);
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Discounts</p>
      {discounts.map((discount: DiscountCode) => (
        <DiscountItem key={discount.id} discount={discount} />
      ))}
    </div>
  );
};

export default Discounts;
