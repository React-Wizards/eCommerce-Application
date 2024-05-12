import Address from '@/features/Address';
import BlockDivider from '@/shared/BlockDivider';
import styles from './BillingAddress.module.scss';

const BillingAddress = () => {
  return (
    <>
      <BlockDivider text={'Billing address'} />
      <Address />
      <label className={styles['from-text__right']} htmlFor='bill-default'>
        Set as default billing address
        <input
          className={styles['form-checkbox-right']}
          type='checkbox'
          id='bill-default'
        />
      </label>
    </>
  );
};

export default BillingAddress;
