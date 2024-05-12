import styles from './Address.module.scss';

const Address = () => {
  return (
    <div className={styles['adress-wrapper']}>
      <input
        type='text'
        className={styles['input-field']}
        placeholder='Address'
      />
      <input
        type='text'
        className={styles['input-field']}
        placeholder='Street'
      />
      <input type='text' className={styles['input-field']} placeholder='City' />
      <select className={styles['coutnry-select']}>
        <option value='Belarus'>Belarus</option>
        <option value='Germany'>Germany</option>
        <option value='Kazakhstan'>Kazakhstan</option>
        <option value='Russia'>Russia</option>
        <option value='USA'>USA</option>
      </select>
      <input
        type='text'
        className={styles['input-field']}
        placeholder='Postal code'
      />
      <input
        type='text'
        className={styles['input-field']}
        placeholder='Phone number'
      />
    </div>
  );
};

export default Address;
