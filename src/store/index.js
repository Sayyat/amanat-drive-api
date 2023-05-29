import {configureStore} from '@reduxjs/toolkit';

import burgerReducer from './slices/burgerSlice';

const store = configureStore({
  reducer: {
    burger: burgerReducer,
  },
});

export default store;