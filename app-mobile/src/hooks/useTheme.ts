import { useAppSelector } from "./useReduce";

const useTheme = () => {
  const { theme, mode } = useAppSelector((state: any) => state.ui);
  return {
    theme,
    mode,
  };
};

export default useTheme;
