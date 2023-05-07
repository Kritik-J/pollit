export const checkNull = (value: string) => {
  return value === null || value.trim() === "" ? true : false;
};

export const checkLength = (value: string, length: number) => {
  return value.length < length ? true : false;
};

export const checkEmail = (value: string) => {
  const reg = /\S+@\S+\.\S+/;
  return reg.test(value) ? false : true;
};
