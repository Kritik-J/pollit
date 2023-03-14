import { useSelector } from "react-redux";

const useTheme = () => {
    const {theme, mode} = useSelector((state: any) => state.ui);
    return {
        theme,
        mode,
    };
}

export default useTheme;