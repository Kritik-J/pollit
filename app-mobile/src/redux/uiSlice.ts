import { createSlice } from '@reduxjs/toolkit';
import { DARK_MODE, DARK_THEME, LIGHT_MODE, LIGHT_THEME } from '@src/utils/constants/themes';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        mode: LIGHT_MODE,
        theme: LIGHT_THEME
    },

    reducers: {
        toggleTheme: (state) => {
            if (state.mode === LIGHT_MODE) {
                state.mode = DARK_MODE;
                state.theme = DARK_THEME;
            } else {
                state.mode = LIGHT_MODE;
                state.theme = LIGHT_THEME;
            } 
        },

    
    },
});

export const { toggleTheme } = uiSlice.actions;

export default uiSlice.reducer;