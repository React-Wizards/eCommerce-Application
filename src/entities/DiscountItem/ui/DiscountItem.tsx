import { DiscountCode } from '@commercetools/platform-sdk';
import styles from './DiscountItem.module.scss';

const DiscountItem = ({ discount }: { discount: DiscountCode }) => {
  return <span className={styles.code}>{discount.code}</span>;
};

export default DiscountItem;
