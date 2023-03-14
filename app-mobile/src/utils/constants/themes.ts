export const LIGHT_BACKGROUND_COLOR = '#ffffff';
export const LIGHT_FONT_COLOR = '#000000';
export const LIGHT_PRIMARY_BUTTON_COLOR = '#000000';
export const LIGHT_PRIMARY_BUTTON_TEXT_COLOR = '#ffffff';
export const LIGHT_SECONDARY_BUTTON_COLOR = '#ffffff';
export const LIGHT_SECONDARY_BUTTON_TEXT_COLOR = '#000000';
export const LIGHT_TEXT_INPUT_BORDER_COLOR = '#000000';
export const LIGHT_TEXT_INPUT_FONT_COLOR = '#000000';
export const LIGHT_TEXT_INPUT_ICON_COLOR = '#000000';

export const DARK_BACKGROUND_COLOR = '#171717';
export const DARK_FONT_COLOR = '#ffffff';
export const DARK_PRIMARY_BUTTON_COLOR = '#ffffff';
export const DARK_PRIMARY_BUTTON_TEXT_COLOR = '#000000';
export const DARK_SECONDARY_BUTTON_COLOR = '#000000';
export const DARK_SECONDARY_BUTTON_TEXT_COLOR = '#ffffff';
export const DARK_TEXT_INPUT_BORDER_COLOR = '#ffffff';
export const DARK_TEXT_INPUT_FONT_COLOR = '#ffffff';
export const DARK_TEXT_INPUT_ICON_COLOR = '#ffffff';

export const ERROR_COLOR = '#f3405e';
export const WARNING_COLOR = '#f7a90d';
export const INFO_COLOR = '#12b2e8';
export const SUCCESS_COLOR = '#14A44D';

export const LIGHT_MODE = 'light';
export const DARK_MODE = 'dark';

export const LIGHT_THEME = {
    colors : {
        backgroundColor: LIGHT_BACKGROUND_COLOR,
        fontColor: LIGHT_FONT_COLOR,
        primaryButtonColor: LIGHT_PRIMARY_BUTTON_COLOR,
        primaryButtonTextColor: LIGHT_PRIMARY_BUTTON_TEXT_COLOR,
        secondaryButtonColor: LIGHT_SECONDARY_BUTTON_COLOR,
        secondaryButtonTextColor: LIGHT_SECONDARY_BUTTON_TEXT_COLOR,
        textInputBorderColor: LIGHT_TEXT_INPUT_BORDER_COLOR,
        textInputFontColor: LIGHT_TEXT_INPUT_FONT_COLOR,
        textInputIconColor: LIGHT_TEXT_INPUT_ICON_COLOR,
        errorColor: ERROR_COLOR,
        warningColor: WARNING_COLOR,
        infoColor: INFO_COLOR,
        successColor: SUCCESS_COLOR,
    },  
};

export const DARK_THEME = {
    colors : {
        backgroundColor: DARK_BACKGROUND_COLOR,
        fontColor: DARK_FONT_COLOR,
        primaryButtonColor: DARK_PRIMARY_BUTTON_COLOR,
        primaryButtonTextColor: DARK_PRIMARY_BUTTON_TEXT_COLOR,
        secondaryButtonColor: DARK_SECONDARY_BUTTON_COLOR,
        secondaryButtonTextColor: DARK_SECONDARY_BUTTON_TEXT_COLOR,
        textInputBorderColor: DARK_TEXT_INPUT_BORDER_COLOR,
        textInputFontColor: DARK_TEXT_INPUT_FONT_COLOR,
        textInputIconColor: DARK_TEXT_INPUT_ICON_COLOR,
        errorColor: ERROR_COLOR,
        warningColor: WARNING_COLOR,
        infoColor: INFO_COLOR,
        successColor: SUCCESS_COLOR,
    },
};

export const THEMES = {
    [LIGHT_MODE]: LIGHT_THEME,
    [DARK_MODE]: DARK_THEME,
};