import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const ADD = "ADD";
const DELETE = "DELETE";

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

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE:
      return state.filter((toDo) => toDo.id !== action.id);
    default:
      return state;
  }
};

export const actionCreators = {
  addToDo,
  deleteToDo,
};

/* redux persist */

// 새로운 persistConfig 선언
const persistConfig = {
  key: "todos",
  storage,
};

const rootReducer = combineReducers({
  reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

const stores = {
  store,
  persistor,
};

export default stores;
