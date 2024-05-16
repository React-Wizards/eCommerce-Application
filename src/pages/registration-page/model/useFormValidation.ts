import { FormEventHandler, useState } from 'react';
import { ValidableField, ValidableForm } from './types';

type FormProps = {
  fields: Array<ValidableField>;
  apiCall?: () => Promise<Response>;
  onSuccess?: (response: Response) => void;
  onFailure?: (error: string) => void;
};

function useFormValidation(props: FormProps): ValidableForm {
  const [isWaiting, setIsWaiting] = useState(false);
  const [serverError, setServerError] = useState('');

  const isFormValid = props.fields.every(
    (field) => !field.error && field.value
  );

  const onFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    props.fields.forEach((field) => {
      field.onBlurHandler();
    });
    console.log('submit!');
  };

  return {
    isWaiting,
    serverError,
    isFormValid,
    onFormSubmit,
    setIsWaiting,
    setServerError
  };
}

export default useFormValidation;
