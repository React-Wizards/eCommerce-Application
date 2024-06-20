import type { ValidableField } from '@/pages/RegistrationPage/model/types';
import styles from './Address.module.scss';

const Address = (props: {
  fieldsList: Array<ValidableField>;
  isDisabled: boolean;
}) => {
  return (
    <div className={styles['adress-wrapper']}>
      {props.fieldsList.map(
        (
          {
            type,
            value,
            options,
            id,
            error,
            placeHolder,
            onChangeHandler,
            onBlurHandler
          },
          ind
        ) => (
          <label
            className='input-label'
            key={ind}
            data-error-message={error || ''}>
            <p className='field-name'>{!!value && placeHolder}</p>
            {type == 'select' ? (
              <select
                value={value}
                className={styles['coutnry-select']}
                onChange={onChangeHandler}
                disabled={props.isDisabled}>
                {options?.map((opt, idx) => (
                  <option value={opt} key={idx}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={id}
                type={type}
                value={value}
                className={styles['input-field']}
                placeholder={placeHolder}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                disabled={props.isDisabled}
              />
            )}
          </label>
        )
      )}
    </div>
  );
};

export default Address;
