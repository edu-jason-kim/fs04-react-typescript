import {
  MouseEventHandler,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import "./App.css";
import Button from "./components/Button";
import Input from "./components/Input";
import Label from "./components/Label";
import { useSetLocale, useTranslate } from "./translate";

interface User {
  id: string;
  username: string;
  email: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
}

function App() {
  // 기본적으로 타입이 추론됨
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  // 1. 반드시 명시적으로 타입을 작성해야 하는 경우
  // 배열의 경우에는 타입 추론이 되지 않음
  // never: 절대 있을 수 없는 값
  const [products, setProducts] = useState<Product[]>([]);

  // 2. 반드시 명시적으로 타입을 작성해야 하는 경우
  // 외부 API를 통해 불러오는 데이터, null로 초기화되기 때문에 추론을 할 수 없음
  const [user, setUser] = useState<User | null>(null);

  // html ref는 null로 초기화
  const formRef = useRef<HTMLFormElement | null>(null);
  const t = useTranslate();
  const setLocale = useSetLocale();

  useEffect(() => {
    const form = formRef.current;
    // 타입 가드
    if (form) form["username"].focus();
    // if (form instanceof HTMLFormElement) form["username"].focus();
  }, []);

  // React는 HTML 기본 이벤트를 사용하지 않고, 자체 이벤트를 사용함 (Synthetic Event를 상속)
  // - 크로스 브라우징 일관성 처리, 성능 최적화, 타입 안정성 (TS 지원) 등이 목적이다.
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const nextValues = {
      ...values,
      [name]: value,
    };
    setValues(nextValues);
  }

  // MouseEventHandler 를 기본 제네릭 T로 Element를 받도록 돼있음.
  // 따라서, 필요에 따라 명시적으로 구체적인 Element 타입을 넣어줘야 함
  // const handleClick: MouseEventHandler = (e) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    const message = `${values.username}님 환영합니다`;
    alert(message);
  };

  return (
    <form className="login" ref={formRef}>
      <h1 className="login-title">{t("signin")}</h1>
      <Label>{t("username")}</Label>
      <Input
        id="username"
        name="username"
        type="text"
        placeholder={t("email or phone number")}
        value={values.username}
        onChange={handleChange}
      />
      <Label>{t("password")}</Label>
      <Input
        id="password"
        name="password"
        type="password"
        placeholder={t("password")}
        value={values.password}
        onChange={handleChange}
      />
      <div className="login-forgot">
        <a className="login-forgot-link" href="#login">
          {t("forgot your password?")}
        </a>
      </div>
      <Button
        id="submit"
        onClick={handleClick}
        // 커스텀 프로퍼티 넘겨보기
        productId="123"
      >
        {t("signin")}
      </Button>
      <div className="login-signup">
        {t("new user?")}{" "}
        <a className="login-signup-link" href="#signup">
          {t("signup")}
        </a>
      </div>
      <div className="locale">
        <span onClick={() => setLocale("ko")}>한국어</span> |{" "}
        <span onClick={() => setLocale("en")}>English</span>
      </div>
    </form>
  );
}

export default App;
