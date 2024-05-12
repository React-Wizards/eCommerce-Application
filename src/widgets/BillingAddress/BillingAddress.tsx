import Address from '../Address';
import FormDivider from '../FormDivider';
import styles from './BillingAddress.module.scss';

const BillingAddress = () => {
  return (
    <>
      <FormDivider text={'Billing address'} />
      <Address />
      <label className={styles['from-text__right']} htmlFor='bill-default'>
        Set as default billing address
        <input
          className={styles['form-checkbox-right']}
          type='checkbox'
          name=''
          id='bill-default'
        />
      </label>
    </>
  );
};

export default BillingAddress;
