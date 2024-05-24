import type { ChangeEvent, HTMLInputTypeAttribute } from 'react';

type Validator<T> = (params: T) => Promise<string | null>;

interface Field {
  type: HTMLInputTypeAttribute | 'select';
  id: string;
  placeHolder?: string;
  validators: Validator<string>[];
  options?: Array<string>;
}

interface ValidableField extends Field {
  type: HTMLInputTypeAttribute;
  id: string;
  value: string;
  error: null | string;
  validators: Validator<string>[];
  onChangeHandler: (
    event: ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => Promise<void>;
  onBlurHandler: () => Promise<void>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

interface ValidableForm {
  isWaiting: boolean;
  serverError: string;
  isFormValid: boolean;
  setIsWaiting: React.Dispatch<React.SetStateAction<boolean>>;
  setServerError: React.Dispatch<React.SetStateAction<string>>;
}

export type { Field, ValidableField, ValidableForm, Validator };
