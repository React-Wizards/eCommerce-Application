import styles from './UserDetails.module.scss';

const UserDetails = () => {
  return (
    <div className={styles['user-details-wrapper']}>
      <input
        type='text'
        className={styles['input-field']}
        placeholder='First name'
      />
      <input
        type='text'
        className={styles['input-field']}
        placeholder='Last name'
      />
      <input
        type='email'
        className={styles['input-field']}
        placeholder='Enter your email address'
      />
      <input
        type='date'
        className={styles['input-field']}
        placeholder='Date of birth'
      />
      <input
        type='password'
        className={styles['input-field']}
        placeholder='Password'
      />
      <input
        type='password'
        className={styles['input-field']}
        placeholder='Confirm Password'
      />
    </div>
  );
};

export default UserDetails;
