import { Link } from 'react-router-dom';
import './RegistrationPage.scss';

const RegistrationPage = () => {
  return (
    <div className='flex justify-center bg-zinc-200 min-[652px]:w-screen min-h-screen'>
      <div className='min-[792px]:w-[792px] min-w-[380px] px-2.5 flex justify-center self-center py-10 rounded-lg bg-white border-b-[10px] border-[#46a358]'>
        {' '}
        {/* px-20 */}
        <div className='max-w-[632px] max-[651px]:max-w-[352px]'>
          {' '}
          {/* h-[832px] */}
          <div className='mb-10 flex justify-center gap-3'>
            <Link className='text-xl font-["Cera_Pro_Medium"]' to='/login'>
              Login
            </Link>
            <span className='w-px h-[16px] bg-[#3D3D3D] self-center'></span>
            <span className='text-xl font-["Cera_Pro_Medium"] text-[#46a358]'>
              Register
            </span>
          </div>
          <p className='text-sm font-["Cera_Pro_Regular"] max-[651px]:ml-[26px]'>
            Enter your registration details:
          </p>
          <form className='' action=''>
            <div className='my-4 flex flex-wrap gap-x-8 gap-y-4 justify-center'>
              <input
                type='text'
                className='w-[300px] px-3 py-2 rounded-[4px] outline-none box-border border border-[#A5A5A5]'
                placeholder='First name'
              />
              <input
                type='text'
                className='w-[300px] px-3 py-2 rounded-[4px] outline-none box-border border border-[#A5A5A5]'
                placeholder='Last name'
              />
              <input
                type='email'
                className='w-[300px] px-3 py-2 rounded-[4px] outline-none box-border border border-[#A5A5A5]'
                placeholder='Enter your email address'
              />
              <input
                type='date'
                className='w-[300px] px-3 py-2 rounded-[4px] outline-none box-border border border-[#A5A5A5]'
                placeholder='Date of birth'
              />
              <input
                type='password'
                className='w-[300px] px-3 py-2 rounded-[4px] outline-none box-border border border-[#A5A5A5]'
                placeholder='Password'
              />
              <input
                type='password'
                className='w-[300px] px-3 py-2 rounded-[4px] outline-none box-border border border-[#A5A5A5]'
                placeholder='Confirm Password'
              />
            </div>
            <p className='mt-8 flex align-middle'>
              <span className='self-center w-full h-[1px] bg-[#EAEAEA]'></span>
              <span className='mx-1 text-nowrap text-sm'>
                {' '}
                Billing address{' '}
              </span>
              <span className='self-center w-full h-[1px] bg-[#EAEAEA]'></span>
            </p>
            <div className='my-4 flex flex-wrap gap-x-8 gap-y-4 justify-center'>
              <input
                type='text'
                className='w-[300px] px-3 py-2 rounded-[4px] outline-none box-border border border-[#A5A5A5]'
                placeholder='Address'
              />
              <input
                type='text'
                className='w-[300px] px-3 py-2 rounded-[4px] outline-none box-border border border-[#A5A5A5]'
                placeholder='Street'
              />
              <input
                type='text'
                className='w-[300px] px-3 py-2 rounded-[4px] outline-none box-border border border-[#A5A5A5]'
                placeholder='Postal code'
              />
              <select
                className='w-[300px] px-3 py-2 text-black rounded-[4px] box-border border border-[#A5A5A5]'
                value='Country'>
                <option
                  className='h-4 text-black rounded-[4px]'
                  value='Russia'></option>
                <option value='Belarus'></option>
                <option value='Kazakhstan'></option>
              </select>
            </div>
            <label
              className='text-sm flex justify-end max-[651px]:mr-[26px]'
              htmlFor='bill-default'>
              Set as default billing address
              <input
                className='ml-2.5'
                type='checkbox'
                name=''
                id='bill-default'
              />
            </label>
            <p className='mt-8 flex align-middle'>
              <span className='self-center w-full h-[1px] bg-[#EAEAEA]'></span>
              <span className='mx-1 text-nowrap text-sm'>
                {' '}
                Shipping address{' '}
              </span>
              <span className='self-center w-full h-[1px] bg-[#EAEAEA]'></span>
            </p>
            <label
              className='text-sm max-[651px]:ml-[26px]'
              htmlFor='same-as-bill'>
              <input
                className='mr-2.5'
                type='checkbox'
                name=''
                id='same-as-bill'
              />
              Same as billing address
            </label>
            <div className='my-4 flex flex-wrap gap-x-8 gap-y-4 justify-center'>
              <input
                type='text'
                className='w-[300px] px-3 py-2 rounded-[4px] outline-none box-border border border-[#A5A5A5]'
                placeholder='Address'
              />
              <input
                type='text'
                className='w-[300px] px-3 py-2 rounded-[4px] outline-none box-border border border-[#A5A5A5]'
                placeholder='Street'
              />
              <input
                type='text'
                className='w-[300px] px-3 py-2 rounded-[4px] outline-none box-border border border-[#A5A5A5]'
                placeholder='Postal code'
              />
              <select
                className='w-[300px] px-3 py-2 text-black rounded-[4px] box-border border border-[#A5A5A5]'
                value='Country'>
                <option
                  className='h-4 text-black rounded-[4px]'
                  value='Russia'></option>
                <option value='Belarus'></option>
                <option value='Kazakhstan'></option>
              </select>
            </div>
            <label
              className='text-sm flex justify-end max-[651px]:mr-[26px]'
              htmlFor='shipp-default'>
              Set as default shipping address
              <input
                className='ml-2.5'
                type='checkbox'
                name=''
                id='shipp-default'
              />
            </label>
            <div className='mt-4 flex justify-center'>
              <button
                type='submit'
                className='w-[300px] h-[45px] rounded-[5px] text-white bg-[#46A358]'>
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
