import Address from '@/features/Address';
import BlockDivider from '@/shared/BlockDivider';
import styles from './ShippingAddress.module.scss';
import { ValidableField } from '@/pages/registration-page/model/types';

const ShippingAddress: React.FC<{
  fieldsList: Array<ValidableField>;
  isSameAddress: boolean;
  onCheckSameAddressHandler: () => void;
  isShippingDefault: boolean;
  onCheckShippingDefaultHandler: () => void;
}> = (props: {
  fieldsList: Array<ValidableField>;
  isSameAddress: boolean;
  onCheckSameAddressHandler: () => void;
  isShippingDefault: boolean;
  onCheckShippingDefaultHandler: () => void;
}) => {
  return (
    <>
      <BlockDivider text={'Shipping address'} />
      <label className={styles['from-text__left']} htmlFor='same-as-bill'>
        <input
          className={styles['form-checkbox-left']}
          type='checkbox'
          id='same-as-bill'
          checked={props.isSameAddress}
          onChange={props.onCheckSameAddressHandler}
        />
        Same as billing address
      </label>
      <Address fieldsList={props.fieldsList} isDisabled={props.isSameAddress} />
      <label className={styles['from-text__right']} htmlFor='shipp-default'>
        Set as default shipping address
        <input
          className={styles['form-checkbox-right']}
          type='checkbox'
          id='shipp-default'
          checked={props.isShippingDefault}
          onChange={props.onCheckShippingDefaultHandler}
        />
      </label>
    </>
  );
};

export default ShippingAddress;
