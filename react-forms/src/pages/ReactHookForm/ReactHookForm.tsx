import styles from './ReactHookForm.module.css';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

interface FormInput {
  name: string;
  age: number;
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

const ReactHookForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({ resolver: yupResolver(validationSchema) });

  const onSubmit = (data: FormInput) => {
    console.log(data);
  };

  return (
    <>
      <h2>React Hook Form</h2>
      <form
        className={styles.form}
        onChange={handleSubmit(onSubmit)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.inputWrapper}>
          <label className={styles.label}>Name</label>
          <input className={styles.input} type="text" {...register('name')} />
        </div>
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}

        <div className={styles.inputWrapper}>
          <label className={styles.label}>Age</label>
          <input className={styles.input} type="number" {...register('age')} />
        </div>
        {errors.age && <p className={styles.error}>{errors.age.message}</p>}

        <input className={styles.input} type="submit" />
      </form>
    </>
  );
};

export default ReactHookForm;
