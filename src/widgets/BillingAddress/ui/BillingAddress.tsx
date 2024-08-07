import type { ValidableField } from '@/pages/RegistrationPage/model/types';
import Address from '@/features/Address';
import BlockDivider from '@/shared/BlockDivider';
import styles from './BillingAddress.module.scss';

const BillingAddress = (props: {
  fieldsList: Array<ValidableField>;
  isBillingDefault: boolean;
  onCheckBillingDefaultHandler: () => void;
}) => {
  return (
    <>
      <BlockDivider text={'Billing address'} />
      <Address fieldsList={props.fieldsList} isDisabled={false} />
      <label className={styles['from-text__right']} htmlFor='bill-default'>
        Set as default billing address
        <input
          className={styles['form-checkbox-right']}
          type='checkbox'
          id='bill-default'
          checked={props.isBillingDefault}
          onChange={props.onCheckBillingDefaultHandler}
        />
      </label>
    </>
  );
};

export default BillingAddress;
