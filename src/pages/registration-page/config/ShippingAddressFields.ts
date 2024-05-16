import minLength from '../lib/validators/min-length';
import onlyLetters from '../lib/validators/only-letters';
import phoneNumber from '../lib/validators/phone-number';
import required from '../lib/validators/required';
import useFieldValidation from '../model/useFieldValidation';

export const ShippingAddressFields = () => {
  return [
    useFieldValidation({
      type: 'text',
      id: 'shipping-address',
      placeHolder: 'Address',
      validators: [minLength(1)]
    }),
    useFieldValidation({
      type: 'text',
      id: 'shipping-street',
      placeHolder: 'Street',
      validators: [required(), minLength(1)]
    }),
    useFieldValidation({
      type: 'text',
      id: 'shipping-city',
      placeHolder: 'City',
      validators: [onlyLetters(), required()]
    }),
    useFieldValidation({
      type: 'select',
      id: 'shipping-country',
      placeHolder: 'Country',
      options: ['Belarus', 'Germany', 'Kazakhstan', 'Russia', 'USA'],
      validators: []
    }),
    useFieldValidation({
      type: 'text',
      id: 'shipping-post',
      placeHolder: 'Postal code',
      validators: [required()]
    }),
    useFieldValidation({
      type: 'tel',
      id: 'shipping-phone',
      placeHolder: 'Phone number',
      validators: [required(), phoneNumber()]
    })
  ];
};
