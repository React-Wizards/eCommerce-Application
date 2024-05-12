import styles from './RegistrationPage.module.scss';
import UserDetails from '@/widgets/UserDetails';
import BillingAddress from '@/widgets/BillingAddress';
import ShippingAddress from '@/widgets/ShippingAddress';

const RegistrationPage = () => {
  return (
    <div className={styles['page-wrapper']}>
      <div className={styles['registration-page']}>
        <div className={styles['form-wrapper']}>
          <div className={styles['form-header']}>
            <a className={styles['form-header__link']} href='/login'>
              Login
            </a>
            <span className={styles['form-header__divider']}></span>
            <span className={styles['form-header__caption']}>Register</span>
          </div>
          <p className={styles['form-text']}>
            Enter your registration details:
          </p>
          <form>
            <UserDetails />
            <BillingAddress />
            <ShippingAddress />
            <div className={styles['controls-wrapper']}>
              <button type='submit' className={styles['register-button']}>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
