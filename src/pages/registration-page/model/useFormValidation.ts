import { FormEventHandler, useState } from 'react';
import { ValidableField, ValidableForm } from './types';

type FormProps = {
  fields: Array<ValidableField>;
  apiCall: () => void;
  onSuccess?: () => void;
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
    setIsWaiting(true);
    setServerError('');
    
    try {
      await props.apiCall();
      props.onSuccess?.();
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Something goes wrong! try again";

      setServerError(msg);
      props.onFailure?.(msg);
    } finally {
      setIsWaiting(false);
    }
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
