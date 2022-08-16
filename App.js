const todoArray = [];
let id = 0;

const inputBoard = document.querySelector('.input-todo');
const initContent = (obj, prop) => {
  obj[prop] = '';
};

// todo 렌더
const renderTodo = () => {
  const todoList = document.querySelector('.todos');
  initContent(todoList, 'innerHTML');

  todoArray.forEach(todo => {
    const list = document.createElement('li');
    list.classList.add('todo-item');

    const todoElem = document.createElement('div');
    todoElem.classList.add('todo');
    todoElem.innerText = todo.content;

    list.appendChild(todoElem);
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
    if (e.code === 'Enter') {
      const { target } = e;
      addTodo(target.value, id++);
      initContent(target, 'value');
    }
  });
};
init();
