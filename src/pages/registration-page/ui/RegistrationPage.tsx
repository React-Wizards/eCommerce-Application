import styles from './RegistrationPage.module.scss';
import UserDetails from '@/widgets/UserDetails';
import BillingAddress from '@/widgets/BillingAddress';
import ShippingAddress from '@/widgets/ShippingAddress';
import useFormValidation from '../model/useFormValidation';
import { UserDetailsFields } from '../config/UserDetailsFields';
import { BillingAddressFields } from '../config/BillingAddressFields';
import { ShippingAddressFields } from '../config/ShippingAddressFields';
import { useEffect, useState } from 'react';
import passwordConfirm from '../lib/validators/password-confirm';
import postCode from '../lib/validators/post-code';
import { Link } from 'react-router-dom';

const RegistrationPage = () => {
  const validableUserDetailsFields = UserDetailsFields();
  const validableBillingAddressFields = BillingAddressFields();
  const validableShippingAddressFields = ShippingAddressFields();

  const passwordField = validableUserDetailsFields.filter(
    (field) => field.id == 'password1'
  )[0];
  validableUserDetailsFields
    .filter((field) => field.id == 'password2')[0]
    ?.validators.push(passwordConfirm(passwordField));

  const billingCountryField = validableBillingAddressFields.filter(
    (field) => field.id == 'billing-country'
  )[0];
  const billingPostCodeField = validableBillingAddressFields.filter(
    (field) => field.id == 'billing-post'
  )[0];
  billingPostCodeField?.validators.push(postCode(billingCountryField));

  const shippingCountryField = validableShippingAddressFields.filter(
    (field) => field.id == 'shipping-country'
  )[0];
  const shippingPostCodeField = validableShippingAddressFields.filter(
    (field) => field.id == 'shipping-post'
  )[0];
  shippingPostCodeField?.validators.push(postCode(shippingCountryField));

  const registrationForm = useFormValidation({
    fields: [
      ...validableUserDetailsFields,
      ...validableBillingAddressFields,
      ...validableShippingAddressFields
    ]
  });

  const [isSameAddress, setSameAddress] = useState(false);
  const [isBillingDefault, setBillingDefault] = useState(false);
  const [isShippingDefault, setShippingDefault] = useState(false);

  const checkSameAddressHandler = () => {
    setSameAddress(!isSameAddress);
  };
  const checkBillingDefaultHandler = () => {
    setBillingDefault(!isBillingDefault);
  };
  const checkShippingDefaultHandler = () => {
    setShippingDefault(!isShippingDefault);
  };

  useEffect(() => {
    billingCountryField.setValue(billingCountryField.options[0]);
  }, []);

  useEffect(() => {
    if (billingPostCodeField.value) {
      billingPostCodeField.onBlurHandler();
    }
  }, [billingCountryField]);

  useEffect(() => {
    shippingCountryField.setValue(shippingCountryField.options[0]);
  }, []);

  useEffect(() => {
    if (shippingPostCodeField.value) {
      shippingPostCodeField.onBlurHandler();
    }
  }, [shippingCountryField]);

  useEffect(() => {
    if (isSameAddress) {
      validableShippingAddressFields.forEach((f) => {
        const billingValue = validableBillingAddressFields.filter(
          (field) => field.id == f.id.replace('shipping', 'billing')
        )[0].value;
        f.setValue(billingValue);
        f.setError(null);
      });
    }
  }, [
    isSameAddress,
    validableBillingAddressFields,
    validableShippingAddressFields
  ]);

  return (
    <div className={styles['page-wrapper']}>
      <div className={styles['registration-page']}>
        <div className={styles['form-wrapper']}>
          <div className={styles['form-header']}>
            <Link className={styles['form-header__link']} to='/login'>
              Login
            </Link>
            <span className={styles['form-header__divider']}></span>
            <span className={styles['form-header__caption']}>Register</span>
          </div>
          <p className={styles['form-text']}>
            Enter your registration details:
          </p>
          <form onSubmit={registrationForm.onFormSubmit}>
            <UserDetails fieldsList={validableUserDetailsFields} />
            <BillingAddress
              fieldsList={validableBillingAddressFields}
              isBillingDefault={isBillingDefault}
              onCheckBillingDefaultHandler={checkBillingDefaultHandler}
            />
            <ShippingAddress
              fieldsList={validableShippingAddressFields}
              isSameAddress={isSameAddress}
              onCheckSameAddressHandler={checkSameAddressHandler}
              isShippingDefault={isShippingDefault}
              onCheckShippingDefaultHandler={checkShippingDefaultHandler}
            />
            <div className={styles['controls-wrapper']}>
              <button
                type='submit'
                className={styles['register-button']}
                disabled={!registrationForm.isFormValid}>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
