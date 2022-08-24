const todoArray = [];
let id = 0;

const inputBoard = document.querySelector('.input__todo');
const initContent = (obj, prop) => {
  obj[prop] = '';
};

// 매개변수 id와 동일한 id를 갖고 있는 객체를 찾은 후
// completed 값을 반전한다
// 이후 바뀐 todoArray를 다시 렌더
const checkTodo = todoId => {
  todoArray.forEach(todo => {
    if (todo.id === todoId) {
      todo.isCompleted = !todo.isCompleted;
    }
  });
  renderTodo();
  setRestTodo();
};

const deleteTodo = todoId => {
  todoArray.forEach((todo, index) => {
    if (todo.id === todoId) {
      todoArray.splice(index, 1);
    }
  });
  setRestTodo();
};

// completed 값에 따른 css 클래스 추가 삭제
const updateCompleted = (completed, todoElem) => {
  if (completed) {
    todoElem.classList.add('checked');
  }
};

// todo 렌더
const renderTodo = () => {
  const todoList = document.querySelector('.list__todo');
  initContent(todoList, 'innerHTML');

  todoArray.forEach(todo => {
    const list = document.createElement('div');
    list.classList.add('todo__item');

    const todoElem = document.createElement('div');
    todoElem.classList.add('todo');
    todoElem.innerText = todo.content;
    todoElem.addEventListener('click', () => checkTodo(todo.id));

    updateCompleted(todo.isCompleted, todoElem);

    const deleteButton = document.createElement('div');
    deleteButton.classList.add('button-delete');
    deleteButton.addEventListener('click', () => deleteTodo(todo.id));

    list.appendChild(todoElem);
    list.appendChild(deleteButton);
    todoList.appendChild(list);
  });
};

// todo 추가
const addTodo = (text, todoId) => {
  todoArray.push({ id: todoId, content: text, isCompleted: false });
  renderTodo();
  setRestTodo();
};

// 초기화면 설정

// basic structure
const init = () => {
  inputBoard.addEventListener('keyup', e => {
    const { target } = e;
    if (e.code === 'Enter' && target.value !== '') {
      addTodo(target.value, id++);
      initContent(target, 'value');
    }
  });
};
init();

// 날짜
const initDate = () => {
  const dateObj = document.querySelector('.text__date');

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const WEEKDAY = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const dayOfWeekDay = WEEKDAY[date.getDay()];

  const yearMonthDay = document.createElement('div');
  yearMonthDay.classList.add('text__year-month-day');
  yearMonthDay.innerText = `${year}년 ${month}월 ${day}일`;

  const dayOfWeek = document.createElement('div');
  dayOfWeek.classList.add('text__day-of-week');
  dayOfWeek.innerText = `${dayOfWeekDay}`;

  dateObj.appendChild(yearMonthDay);
  dateObj.appendChild(dayOfWeek);
};
initDate();

// 남은 할 일 표시
const setRestTodo = () => {
  const rest = document.querySelector('.text__rest-todo');
  const countRest = todoArray.filter(todo => !todo.isCompleted).length;

  rest.innerText = `할 일 ${countRest}개 남음`;
  renderTodo();
};
setRestTodo();
