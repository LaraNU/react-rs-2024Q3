import styles from './InputUncontrolled.module.css';

type InputUncontrolledProps = {
  nameInput: string;
  type: string;
  value: string | number;
  onChange: (value: string | number) => void;
};

const InputUncontrolled = ({
  nameInput,
  type,
  value,
  onChange,
}: InputUncontrolledProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label}>{nameInput}</label>
      <input
        className={styles.input}
        type={type}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputUncontrolled;
