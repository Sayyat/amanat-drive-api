import { configureStore } from '@reduxjs/toolkit';

// Импортируйте ваши срезы (slices) и/или редьюсеры
import burgerReducer from './slices/burgerSlice';

const store = configureStore({
  reducer: {
    // Добавьте ваши срезы и/или редьюсеры
    burger: burgerReducer,
  },
});

export default store;