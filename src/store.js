import { createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";
const TODOS = "todos";

// action creator
const addToDo = (text) => {
  return {
    type: ADD,
    text,
  };
};

const deleteToDo = (id) => {
  return {
    type: DELETE,
    id: parseInt(id),
  };
};

// localStorage
const getTodos = () => JSON.parse(localStorage.getItem(TODOS));
const setTodos = (todos) => localStorage.setItem(TODOS, JSON.stringify(todos));

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      const addObj = [{ text: action.text, id: Date.now() }, ...state];
      setTodos(addObj);
      return getTodos();
    case DELETE:
      const filterToDos = state.filter((toDo) => toDo.id !== action.id);
      setTodos(filterToDos);
      return getTodos();
    default:
      return getTodos() || state;
  }
};

const store = createStore(reducer);

export const actionCreators = {
  addToDo,
  deleteToDo,
};

export default store;
