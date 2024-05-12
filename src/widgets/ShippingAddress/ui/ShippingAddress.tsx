import Address from '@/features/Address';
import BlockDivider from '@/shared/BlockDivider';
import styles from './ShippingAddress.module.scss';

const ShippingAddress = () => {
  return (
    <>
      <BlockDivider text={'Shipping address'} />
      <label className={styles['from-text__left']} htmlFor='same-as-bill'>
        <input
          className={styles['form-checkbox-left']}
          type='checkbox'
          id='same-as-bill'
        />
        Same as billing address
      </label>
      <Address />
      <label className={styles['from-text__right']} htmlFor='shipp-default'>
        Set as default shipping address
        <input
          className={styles['form-checkbox-right']}
          type='checkbox'
          id='shipp-default'
        />
      </label>
    </>
  );
};

export default ShippingAddress;
