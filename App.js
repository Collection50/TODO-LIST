const todoArray = [];
let id = 0;

const inputBoard = document.querySelector('.input-todo');

// todo 추가
const addTodo = (text, todoId) => {
  todoArray.push({ id: todoId, content: text, isCompleted: false });
};

// 초기화면 설정
const init = () => {
  inputBoard.addEventListener('keyup', e => {
    if (e.code === 'Enter') {
      addTodo(e.target.value, id++);
      inputBoard.value = '';
    }
  });
};
init();
