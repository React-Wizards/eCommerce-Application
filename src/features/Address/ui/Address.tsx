import type { ValidableField } from '@/pages/RegistrationPage/model/types';
import styles from './Address.module.scss';

const Address = (props: {
  fieldsList: Array<ValidableField>;
  isDisabled: boolean;
}) => {
  return (
    <div className={styles['adress-wrapper']}>
      {props.fieldsList.map((field, ind) => (
        <label
          className='input-label'
          key={ind}
          data-error-message={field.error || ''}>
          <p className='field-name'>{!!field.value && field.placeHolder}</p>
          {field.type == 'select' ? (
            <select
              value={field.value}
              className={styles['coutnry-select']}
              onChange={field.onChangeHandler}
              disabled={props.isDisabled}>
              {field.options?.map((opt, idx) => (
                <option value={opt} key={idx}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={field.id}
              type={field.type}
              value={field.value}
              className={styles['input-field']}
              placeholder={field.placeHolder}
              onChange={field.onChangeHandler}
              onBlur={field.onBlurHandler}
              disabled={props.isDisabled}
            />
          )}
        </label>
      ))}
    </div>
  );
};

export default Address;
