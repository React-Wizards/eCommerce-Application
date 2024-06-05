import type {
  BaseAddress,
  ClientResponse,
  CustomerSignInResult,
  MyCustomerDraft
} from '@commercetools/platform-sdk';
import type { ValidableField } from '../model/types';
import {
  type FormEvent,
  type FormEventHandler,
  useEffect,
  useState
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import UserDetails from '@/widgets/UserDetails';
import { login } from '@/entities/customer';
import BillingAddress from '@/widgets/BillingAddress';
import ShippingAddress from '@/widgets/ShippingAddress';
import Modal from '@/shared/ErrorModal';
import { authRoot } from '@/shared/api';
import passwordConfirm from '../lib/validators/password-confirm';
import postCode from '../lib/validators/post-code';
import useFormValidation from '../model/useFormValidation';
import { UserDetailsFields } from '../config/UserDetailsFields';
import { BillingAddressFields } from '../config/BillingAddressFields';
import { ShippingAddressFields } from '../config/ShippingAddressFields';
import logo from '@/shared/assets/img/logo.svg';
import styles from './RegistrationPage.module.scss';

const RegistrationPage = () => {
  const validableUserDetailsFields = UserDetailsFields();
  const validableBillingAddressFields = BillingAddressFields();
  const validableShippingAddressFields = ShippingAddressFields();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVisible, seIsVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countryCode: { [key: string]: string } = {
    Belarus: 'BY',
    Germany: 'DE',
    Russia: 'RU',
    Kazakhstan: 'KZ',
    USA: 'US'
  };

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

  function getFieldById(
    array: Array<ValidableField>,
    id: string
  ): ValidableField {
    return array.filter((field) => field.id == id)[0];
  }

  const handleCustomerSignUpError: (message: string) => void = (
    message: string
  ): void => {
    seIsVisible(true);
    setErrorMessage(message);

    setTimeout(() => {
      seIsVisible(false);
    }, 1500);
  };

  const apiCall: FormEventHandler<HTMLFormElement> = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    const billingAddress: BaseAddress = {
      key: 'address1',
      country:
        countryCode[
          getFieldById(validableBillingAddressFields, 'billing-country').value
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
        countryCode[
          getFieldById(validableBillingAddressFields, 'billing-country').value
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

    const newCustomer: MyCustomerDraft = {
      email: getFieldById(validableUserDetailsFields, 'email').value,
      password: getFieldById(validableUserDetailsFields, 'password1').value,
      firstName: getFieldById(validableUserDetailsFields, 'firstname').value,
      lastName: getFieldById(validableUserDetailsFields, 'lastname').value,
      dateOfBirth: getFieldById(validableUserDetailsFields, 'birthdate').value,
      defaultShippingAddress: isShippingDefault ? 1 : 0,
      addresses: [billingAddress]
    };

    if (!isSameAddress) {
      newCustomer.addresses?.push(shippingAddress);
    }
    console.log(newCustomer);

    try {
      const customer: ClientResponse<CustomerSignInResult> = await authRoot
        .me()
        .signup()
        .post({
          body: newCustomer
        })
        .execute();

      await authRoot
        .login()
        .post({
          body: {
            email: newCustomer.email,
            password: newCustomer.password
          }
        })
        .execute();

      navigate('/home');
      dispatch(login(customer.body.customer));
    } catch (error: unknown) {
      if (error instanceof Error) {
        handleCustomerSignUpError(error.message);
      } else {
        console.error(`Unknown error! ${error}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles['page-wrapper']}>
      <Modal isVisible={isVisible} message={errorMessage} />
      <div className={styles['registration-page']}>
        <div className={styles['form-wrapper']}>
          <div className={styles['form-header']}>
            <Link className={styles['form-header__link']} to='/login'>
              Login
            </Link>
            <span className={styles['form-header__divider']}></span>
            <Link className={styles['form-header__caption']} to='/register'>
              Register
            </Link>
            <Link className={styles['from-header__home-link']} to='/home'>
              <img
                className={styles['from-header__logo']}
                src={logo}
                alt='logo'
              />
            </Link>
          </div>
          <p className={styles['form-text']}>
            Enter your registration details:
          </p>
          <form onSubmit={apiCall}>
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
                disabled={!registrationForm.isFormValid || isLoading}>
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
