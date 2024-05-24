import type { ValidableField, ValidableForm } from './types';
import { useState } from 'react';

type FormProps = {
  fields: Array<ValidableField>;
  onSuccess?: () => void;
  onFailure?: (error: string) => void;
};

function useFormValidation(props: FormProps): ValidableForm {
  const [isWaiting, setIsWaiting] = useState(false);
  const [serverError, setServerError] = useState('');

  const isFormValid = props.fields.every(
    (field) => !field.error && field.value
  );

  return {
    isWaiting,
    serverError,
    isFormValid,
    setIsWaiting,
    setServerError
  };
}

export default useFormValidation;
