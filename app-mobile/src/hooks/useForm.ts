import { useAppSelector } from "./useReduce";

const useForm = () => {
  return useAppSelector((state) => state.form);
};

export default useForm;
