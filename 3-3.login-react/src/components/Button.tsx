import { ReactNode } from "react";
import styles from "./Button.module.css";

interface Props extends React.ComponentProps<'button'> {
  id: string;
  children: ReactNode;
  // 커스텀 프로퍼티 받아보기
  productId: string;
  className?: string;
}

export default function Button(props: Props) {
  const { className = "", id, children, onClick } = props;

  const classNames = `${styles.button} ${className}`;
  return (
    <button id={id} className={classNames} onClick={onClick}>
      {children}
    </button>
  );
}
