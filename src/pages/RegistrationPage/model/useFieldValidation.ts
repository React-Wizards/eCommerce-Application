import { type ChangeEvent, useCallback, useState } from 'react';
import type { Field } from './types';
import validateValue from '../lib/validators';

function useFieldValidation(fieldDefinition: Field) {
  const [value, setVal] = useState('');
  const [error, setErr] = useState<string | null>(null);

  const onChangeHandler = useCallback(
    async (
      event: ChangeEvent<
        HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
      >
    ) => {
      const val = event.target.value;
      setVal(val);
      setErr(await validateValue(val, fieldDefinition.validators));
    },
    [fieldDefinition.validators]
  );

  const onBlurHandler = useCallback(async () => {
    setErr(await validateValue(value, fieldDefinition.validators));
  }, [value, fieldDefinition.validators]);

  const setValue = useCallback(async (value: React.SetStateAction<string>) => {
    setVal(value);
  }, []);

  const setError = useCallback(
    async (error: React.SetStateAction<string | null>) => {
      setErr(error);
    },
    []
  );

  return {
    type: fieldDefinition.type,
    id: fieldDefinition.id,
    placeHolder: fieldDefinition.placeHolder,
    value,
    error,
    validators: fieldDefinition.validators,
    options: fieldDefinition.options || [],
    onChangeHandler,
    onBlurHandler,
    setValue,
    setError
  };
}

export default useFieldValidation;
