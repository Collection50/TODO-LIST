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
};

const deleteTodo = todoId => {
  todoArray.forEach((todo, index) => {
    if (todo.id === todoId) {
      todoArray.splice(index, 1);
    }
  });
  renderTodo();
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
};

// 초기화면 설정
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
