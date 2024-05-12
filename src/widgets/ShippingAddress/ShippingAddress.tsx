import Address from '../Address';
import FormDivider from '../FormDivider';
import styles from './ShippingAddress.module.scss';

const ShippingAddress = () => {
  return (
    <>
      <FormDivider text={'Shipping address'} />
      <label className={styles['from-text__left']} htmlFor='same-as-bill'>
        <input
          className={styles['form-checkbox-left']}
          type='checkbox'
          name=''
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
          name=''
          id='shipp-default'
        />
      </label>
    </>
  );
};

export default ShippingAddress;
