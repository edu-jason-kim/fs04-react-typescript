// 타입단언 1. as 타입 연산자 활용
const usernameInput = document.getElementById('username') as HTMLInputElement;
// 타입단언 2. <type> expression 문법
// - react와 문법 충돌이 있어 잘 쓰이지 않음
// const submitButton = <HTMLElement>document.getElementById('submit');
const submitButton = document.getElementById('submit');

usernameInput.focus();

// 타입 가드를 활용하는 방법
// if (submitButton) { // 단순히 null check만 해도 됨!
if (submitButton instanceof HTMLButtonElement) {
  submitButton.addEventListener('click', handleClick);
}

submitButton instanceof HTMLButtonElement   // true
submitButton instanceof HTMLElement         // true
submitButton instanceof Element             // true
submitButton instanceof Node                // true
submitButton instanceof EventTarget         // true

usernameInput.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    console.log(e.key)
    e.preventDefault();
    const message = `${usernameInput.value}님 반갑습니다!`;
    alert(message);
  }
})

function handleClick(e: MouseEvent) {
  e.preventDefault();
  const message = `${usernameInput.value}님 반갑습니다!`;
  alert(message);
}
