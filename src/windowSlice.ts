import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WindowState {
  maximised: boolean;
  visible: boolean;
  editable: boolean;
}

const initialState: WindowState = {
  maximised: false,
  visible: false,
  editable: true,
};

export const windowSlice = createSlice({
  name: 'window',
  initialState,
  reducers: {
    maximise: (state) => {
      state.maximised = true;
    },
    minimise: (state) => {
      state.maximised = false;
    },
    visible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
    editable: (state, action: PayloadAction<boolean>) => {
      state.editable = action.payload;
    }
  }
});

export const { maximise, minimise, visible, editable } = windowSlice.actions;
export default windowSlice.reducer;
