import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");

/* Redux Toolkit - createReducer */
const reducer = createReducer([], (builder) => {
  builder
    .addCase(addToDo, (state, action) => {
      state.push({ text: action.payload, id: Date.now() });
    })
    .addCase(deleteToDo, (state, action) =>
      state.filter((toDo) => toDo.id !== action.payload)
    );
});

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

const store = configureStore({ reducer: persistedReducer });
const persistor = persistStore(store);

const stores = {
  store,
  persistor,
};

export default stores;
