import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import styles from './RegisterForm.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Import Image component
import logo from "@/public/logo.png";
// GraphQL Mutation for user registration
const REGISTER_USER = gql`
  mutation RegisterCustomer($input: RegisterCustomerInput!) {
    registerCustomer(input: $input) {
      id
      name
      email
      phone
    }
  }
`;

type FormData = {
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [registerCustomer, { loading, error }] = useMutation(REGISTER_USER);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const { data: customerData } = await registerCustomer({
        variables: {
          input: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            city: data.city,
            state: data.state,
            country: data.country,
            pincode: data.pincode,
            password: data.password,
            confirmPassword: data.confirmPassword,
          },
        },
      });

      console.log('Registration Success', customerData);
      alert('Registration successful!');
      router.push('/send-otp');
    } catch (err) {
      console.error('Registration Error', err);
      if (err?.message) {
        alert(`Error in registration: ${err.message}`);
      alert('Error in registration!');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
      <Image src={logo} alt='logo' width={180} height={80} className={styles.logo}/>
      <h1 className={styles.welcomeText}>Welcome to Carental</h1>
        <p className={styles.welcomeMessage}>Your journey starts here. Register now!</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2>Register</h2>
        <label htmlFor="name">Name</label>
        <input id="name" {...register('name', { required: 'Name is required' })} />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}

        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register('email', { required: 'Email is required' })} />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}

        <label htmlFor="phone">Phone</label>
        <input id="phone" {...register('phone', { required: 'Phone number is required' })} />
        {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}

        <label htmlFor="city">City</label>
        <input id="city" {...register('city', { required: 'City is required' })} />
        {errors.city && <p className={styles.error}>{errors.city.message}</p>}

        <label htmlFor="state">State</label>
        <input id="state" {...register('state', { required: 'State is required' })} />
        {errors.state && <p className={styles.error}>{errors.state.message}</p>}

        <label htmlFor="country">Country</label>
        <input id="country" {...register('country', { required: 'Country is required' })} />
        {errors.country && <p className={styles.error}>{errors.country.message}</p>}

        <label htmlFor="pincode">Pincode</label>
        <input id="pincode" {...register('pincode', { required: 'Pincode is required' })} />
        {errors.pincode && <p className={styles.error}>{errors.pincode.message}</p>}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register('password', { required: 'Password is required', minLength: 6 })}
        />
        {errors.password && <p className={styles.error}>{errors.password.message}</p>}

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value, data) => value === data.password || 'Passwords do not match',
          })}
        />
        {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}

        <button type="submit" disabled={loading} className={styles.submitButton}>
          {loading ? 'Registering...' : 'Register'}
        </button>

        {error && <p className={styles.error}>Error: {error.message}</p>}
      </form>
    </div>
  );
}
