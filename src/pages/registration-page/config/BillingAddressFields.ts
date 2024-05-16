import minLength from '../lib/validators/min-length';
import onlyLetters from '../lib/validators/only-letters';
import phoneNumber from '../lib/validators/phone-number';
import required from '../lib/validators/required';
import useFieldValidation from '../model/useFieldValidation';

export const BillingAddressFields = () => {
  return [
    useFieldValidation({
      type: 'text',
      id: 'billing-address',
      placeHolder: 'Address',
      validators: [minLength(1)]
    }),
    useFieldValidation({
      type: 'text',
      id: 'billing-street',
      placeHolder: 'Street',
      validators: [required(), minLength(1)]
    }),
    useFieldValidation({
      type: 'text',
      id: 'billing-city',
      placeHolder: 'City',
      validators: [onlyLetters(), required()]
    }),
    useFieldValidation({
      type: 'select',
      id: 'billing-country',
      placeHolder: 'Country',
      options: ['Belarus', 'Germany', 'Kazakhstan', 'Russia', 'USA'],
      validators: []
    }),
    useFieldValidation({
      type: 'text',
      id: 'billing-post',
      placeHolder: 'Postal code',
      validators: [required()]
    }),
    useFieldValidation({
      type: 'tel',
      id: 'billing-phone',
      placeHolder: 'Phone number',
      validators: [required(), phoneNumber()]
    })
  ];
};
