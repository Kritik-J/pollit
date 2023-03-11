import { createSlice } from '@reduxjs/toolkit';
import { DARK_MODE, LIGHT_MODE, THEMES } from '@src/utils/constants/themes';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        mode: LIGHT_MODE,
        theme: THEMES[LIGHT_MODE],
    },

    reducers: {
        setTheme: (state, action) => {
            state.mode = action.payload;
            state.theme = action.payload === LIGHT_MODE ?  THEMES[LIGHT_MODE] : THEMES[DARK_MODE];
        }
    },
});

export const { setTheme } = uiSlice.actions;

export default uiSlice.reducer;