import type { ValidableField } from '@/pages/RegistrationPage/model/types';
import { Dispatch, SetStateAction, useState } from 'react';
import ShowHideButton from '@/shared/ShowHideButton';
import styles from './UserDetails.module.scss';

type PassVisibility = { [key: string]: boolean };

const UserDetails = (props: { fieldsList: Array<ValidableField> }) => {
  const initialVisibility: PassVisibility = Object.fromEntries(
    props.fieldsList
      .filter((field) => field.type == 'password')
      .reduce((result: Array<[string, boolean]>, entry) => {
        result.push([entry.id, false]);
        return result;
      }, [])
  );

  const [passwordsVisibility, setPasswordsVisibility]: [
    PassVisibility,
    Dispatch<SetStateAction<PassVisibility>>
  ] = useState(initialVisibility);

  const togglePassVisibility = (passId: string) => {
    setPasswordsVisibility({
      ...passwordsVisibility,
      [passId]: !passwordsVisibility[passId]
    });
  };

  return (
    <div className={styles['user-details-wrapper']}>
      {props.fieldsList.map((field, ind) => (
        <label
          className='input-label'
          key={ind}
          data-error-message={field.error || ''}
        >
          <p className='field-name'>{!!field.value && field.placeHolder}</p>
          <input
            id={field.id}
            type={
              field.type == 'password'
                ? passwordsVisibility[field.id]
                  ? 'text'
                  : 'password'
                : field.type
            }
            value={field.value}
            className={styles['input-field']}
            placeholder={field.placeHolder}
            onChange={field.onChangeHandler}
            onBlur={field.onBlurHandler}
            data-placeholder={
              field.type == 'date' ? `- ${field.placeHolder}` : null
            }
            required={true}
            min={field.type == 'date' ? 0 : undefined}
          />
          {field.type == 'password' ? (
            <ShowHideButton
              onClickHandler={() => togglePassVisibility(field.id)}
              isShow={passwordsVisibility[field.id]}
            />
          ) : null}
        </label>
      ))}
    </div>
  );
};

export default UserDetails;
