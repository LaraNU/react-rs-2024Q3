import styles from './UncontrolledForm.module.css';
import InputUncontrolled from '../../components/InputUncontrolled/InputUncontrolled';
import * as Yup from 'yup';
import { useState } from 'react';

interface FormErrors {
  name?: string;
  age?: string;
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
});

const UncontrolledForm = () => {
  const [formData, setFormData] = useState({ name: '', age: '' });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (name: string) => (value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log('formData:', formData);
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
        <InputUncontrolled
          nameInput={'Name'}
          type={'text'}
          value={formData.name}
          onChange={handleChange('name')}
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}

        <InputUncontrolled
          nameInput={'Age'}
          type={'number'}
          value={formData.age}
          onChange={handleChange('age')}
        />
        {errors.age && <p className={styles.error}>{errors.age}</p>}

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default UncontrolledForm;
