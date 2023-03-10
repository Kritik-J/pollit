import { createSlice } from '@reduxjs/toolkit';
import { DARK_MODE, DARK_THEME, LIGHT_MODE, LIGHT_THEME } from '@src/utils/constants/themes';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        mode: LIGHT_MODE,
        theme: LIGHT_THEME
    },

    reducers: {
        setTheme: (state, action) => {
            state.mode = action.payload;
            state.theme = action.payload === LIGHT_MODE ? LIGHT_THEME: DARK_THEME ;
        }
    },
});

export const { setTheme } = uiSlice.actions;

export default uiSlice.reducer;