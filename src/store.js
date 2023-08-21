import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore, createSlice } from "@reduxjs/toolkit";

const toDos = createSlice({
  name: "toDosReducer",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push({ text: action.payload, id: Date.now() });
    },
    remove: (state, action) =>
      state.filter((toDo) => toDo.id !== action.payload),
  },
});

export const { add, remove } = toDos.actions;

/* redux persist */

// 새로운 persistConfig 선언
const persistConfig = {
  key: "todos",
  storage,
};

const rootReducer = combineReducers({
  reducer: toDos.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

let persistor = persistStore(store);

const stores = {
  store,
  persistor,
};

export default stores;
