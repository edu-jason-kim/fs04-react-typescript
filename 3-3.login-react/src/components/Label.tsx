import styles from "./Label.module.css";

interface Props extends React.ComponentProps<"label"> {}

export default function Label({ className = "", children }: Props) {
  const classNames = `${styles.label} ${className}`;
  return <label className={classNames}>{children}</label>;
}
