import styles from "./Input.module.css";

// 1. InputHTMLAttributes: 순수하게 HTML 속성만 포함
// interface Props extends InputHTMLAttributes<HTMLInputElement> {}

// 2. React.ComponentProps: ref, key 같은 React 특유의 props도 포함
interface Props extends React.ComponentProps<"input"> {}

export default function Input({
  className = "",
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
}: Props) {
  const classNames = `${styles.input} ${className}`;
  return (
    <input
      className={classNames}
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
