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
    clickLink(state) {
      state.value = false;
    },
  },
});

export const { click, clickLink } = burgerSlice.actions;
export default burgerSlice.reducer;