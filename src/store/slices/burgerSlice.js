import { createSlice } from '@reduxjs/toolkit';

const burgerSlice = createSlice({
  name: 'burger',
  initialState: {
    value: false,
  },
  reducers: {
    click(state) {
      state.value = !state.value;
    },
  },
});

export const { click } = burgerSlice.actions;
export default burgerSlice.reducer;