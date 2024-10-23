import styles from './UncontrolledForm.module.css';
import * as Yup from 'yup';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCountries } from '../../store/sliceCountries';

interface FormErrors {
  name?: string;
  age?: string;
  email?: string;
  password?: string;
  accept?: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('The name is required')
    .min(2, 'The name must contain at least 2 characters')
    .test(
      'first-uppercase',
      'The first character must be a capital letter',
      (value) => {
        return value ? /^[A-Z]/.test(value.charAt(0)) : false;
      }
    ),
  age: Yup.number()
    .required('Age is required')
    .positive('no negative values')
    .integer('The age must be an integer')
    .min(1, 'The age must be at least 1 year old'),
  email: Yup.string()
    .required('Email is required')
    .matches(/@/, "Email must contain an '@' symbol")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format'
    ),
  password: Yup.string()
    .required('Password is required')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[A-Z]/, 'Password must contain at least one uppercased letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercased letter')
    .matches(
      /^(?=.*[!@#$%^&*(),.?":{}|<>])/,
      'Password must contain at least one special character'
    ),
  accept: Yup.string().required('You must accept the Terms and Conditions'),
});

const UncontrolledForm = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const countries = useSelector(selectCountries);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData);
    console.log(data, 'data');

    try {
      await validationSchema.validate(data, { abortEarly: false });
      setErrors({});
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const formErrors: { [key: string]: string } = {};

        error.inner.forEach((err) => {
          if (err.path) {
            formErrors[err.path] = err.message;
          }
        });

        setErrors(formErrors);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <>
      <h2>Uncontrolled Form</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <label className={styles.label}>Name</label>
          <input className={styles.input} type="text" name="name" id="name" />
        </div>
        {errors.name && <p className={styles.error}>{errors.name}</p>}

        <div className={styles.inputWrapper}>
          <label className={styles.label}>Age</label>
          <input className={styles.input} type="number" name="age" id="age" />
        </div>
        {errors.age && <p className={styles.error}>{errors.age}</p>}

        <div className={styles.inputWrapper}>
          <label className={styles.label}>Email</label>
          <input className={styles.input} type="text" name="email" id="email" />
        </div>
        {errors.email && <p className={styles.error}>{errors.email}</p>}

        <div className={styles.inputWrapper}>
          <label className={styles.label}>Password</label>
          <input
            className={styles.input}
            type="password"
            name="password"
            id="password"
          />
        </div>
        {errors.password && <p className={styles.error}>{errors.password}</p>}

        <div className={styles.inputWrapper}>
          <label className={styles.label}>Confirm Password</label>
          <input
            className={styles.input}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
          />
        </div>

        <div className={styles.inputWrapper}>
          <legend>Gender:</legend>
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            name="gender"
            id="male"
            value="male"
            defaultChecked
          />

          <label htmlFor="female">Female</label>
          <input type="radio" name="gender" id="female" value="female" />
        </div>

        <div className={styles.inputWrapper}>
          <label className={styles.label}>Upload picture</label>
          <input
            className={styles.input}
            accept="image/png, image/jpeg"
            type="file"
            name="image"
            id="image"
          />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="">Countries</label>
          <input list="countries" name="country" />
          <datalist id="countries">
            {countries.map((country: string) => (
              <option key={country} value={country}></option>
            ))}
          </datalist>
        </div>

        <label>
          <input type="checkbox" name="accept" id="accept" /> I agree to the
          Terms and Conditions
        </label>
        {errors.accept && <p className={styles.error}>{errors.accept}</p>}
        <button className={styles.btnSubmit} type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default UncontrolledForm;
