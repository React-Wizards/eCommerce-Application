import differentCase from '../lib/validators/different-case';
import email from '../lib/validators/e-mail';
import minDigits from '../lib/validators/min-digits';
import minLength from '../lib/validators/min-length';
import notYounger from '../lib/validators/not-younger';
import onlyLetters from '../lib/validators/only-letters';
import required from '../lib/validators/required';
import useFieldValidation from '../model/useFieldValidation';

export const UserDetailsFields = () => {
  return [
    useFieldValidation({
      type: 'text',
      id: 'firstname',
      placeHolder: 'First name',
      validators: [minLength(1), onlyLetters()]
    }),
    useFieldValidation({
      type: 'text',
      id: 'lastname',
      placeHolder: 'Last name',
      validators: [onlyLetters(), required(), minLength(3)]
    }),
    useFieldValidation({
      type: 'email',
      id: 'email',
      placeHolder: 'E-mail address',
      validators: [required(), email()]
    }),
    useFieldValidation({
      type: 'date',
      id: 'birthdate',
      placeHolder: 'Date of birth',
      validators: [required(), notYounger(13)]
    }),
    useFieldValidation({
      type: 'password',
      id: 'password1',
      placeHolder: 'Password',
      validators: [required(), minLength(8), differentCase(), minDigits(1)]
    }),
    useFieldValidation({
      type: 'password',
      id: 'password2',
      placeHolder: 'Password confirmation',
      validators: [required()]
    })
  ];
};
