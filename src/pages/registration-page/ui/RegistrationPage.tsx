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
import LoadingHandler from '@/features/inputWaiter';
import ModalHandler from '@/features/inputModal';
import { useNavigate } from 'react-router-dom';
import { apiRoot } from '../api/BuildClient';
import { ValidableField } from '../model/types';
import { BaseAddress, CountryCode, CustomerDraft } from '../api/types';

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
    ],
    apiCall,
    onSuccess,
    onFailure
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

  const [isModalActive, setModalActive] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);

  const navigate = useNavigate();
  const closeModal = () => {
    setModalActive(false);
    if (!isError) {
      navigate('/main');
    }
  };

  function getFieldById(
    array: Array<ValidableField>,
    id: string
  ): ValidableField {
    return array.filter((field) => field.id == id)[0];
  }

  function apiCall(): Promise<{ ok: boolean; code: number }> {
    const billingAddress: BaseAddress = {
      key: 'address1',
      country:
        CountryCode[
          getFieldById(validableBillingAddressFields, 'billing-country')
            .value as keyof typeof CountryCode
        ],
      firstName: getFieldById(validableUserDetailsFields, 'firstname').value,
      lastName: getFieldById(validableUserDetailsFields, 'lastname').value,
      streetName: getFieldById(validableBillingAddressFields, 'billing-address')
        .value,
      streetNumber: getFieldById(
        validableBillingAddressFields,
        'billing-street'
      ).value,
      postalCode: getFieldById(validableBillingAddressFields, 'billing-post')
        .value,
      city: getFieldById(validableBillingAddressFields, 'billing-city').value,
      phone: getFieldById(validableBillingAddressFields, 'billing-phone').value,
      email: getFieldById(validableUserDetailsFields, 'email').value
    };

    const shippingAddress: BaseAddress = {
      key: 'address2',
      country:
        CountryCode[
          getFieldById(validableShippingAddressFields, 'shipping-country')
            .value as keyof typeof CountryCode
        ],
      firstName: getFieldById(validableUserDetailsFields, 'firstname').value,
      lastName: getFieldById(validableUserDetailsFields, 'lastname').value,
      streetName: getFieldById(
        validableShippingAddressFields,
        'shipping-address'
      ).value,
      streetNumber: getFieldById(
        validableShippingAddressFields,
        'shipping-street'
      ).value,
      postalCode: getFieldById(validableShippingAddressFields, 'shipping-post')
        .value,
      city: getFieldById(validableShippingAddressFields, 'shipping-city').value,
      phone: getFieldById(validableShippingAddressFields, 'shipping-phone')
        .value,
      email: getFieldById(validableUserDetailsFields, 'email').value
    };

    const newCustomer: CustomerDraft = {
      email: getFieldById(validableUserDetailsFields, 'email').value,
      password: getFieldById(validableUserDetailsFields, 'password1').value,
      firstName: getFieldById(validableUserDetailsFields, 'firstname').value,
      lastName: getFieldById(validableUserDetailsFields, 'lastname').value,
      dateOfBirth: getFieldById(validableUserDetailsFields, 'birthdate').value,
      addresses: [billingAddress],
      billingAddresses: [0]
    };

    if (isBillingDefault) {
      newCustomer.defaultBillingAddress = 0;
    }

    if (isSameAddress) {
      newCustomer.shippingAddresses = [0];
      if (isShippingDefault) {
        newCustomer.defaultShippingAddress = 0;
      }
    } else {
      newCustomer.addresses?.push(shippingAddress);
      newCustomer.shippingAddresses = [1];
      if (isShippingDefault) {
        newCustomer.defaultShippingAddress = 1;
      }
    }

    return apiRoot
      .me()
      .signup()
      .post({
        body: newCustomer
      })
      .execute()
      .then(() => {
        apiRoot
          .me()
          .login()
          .post({
            body: {
              email: newCustomer.email,
              password: newCustomer.password
            }
          })
          .execute()
          .then((/* { body } */) => {
            // TODO:
            // add logined customer to store
          });
      });
  }

  function onSuccess() {
    setError(false);
    setModalActive(true);
  }

  function onFailure(message: string) {
    console.log('Error:', message);
    setError(true);
    setModalActive(true);
  }

  return (
    <div className={styles['page-wrapper']}>
      <div className={styles['registration-page']}>
        <div className={styles['form-wrapper']}>
          <div className={styles['form-header']}>
            <a className={styles['form-header__link']} href='/login'>
              Login
            </a>
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
          {registrationForm.isWaiting ? (
            <LoadingHandler text={'Registration pending...'} />
          ) : null}
          {isModalActive ? (
            <ModalHandler
              text={
                isError
                  ? registrationForm.serverError
                  : 'Registration successfull!'
              }
              callback={closeModal}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
