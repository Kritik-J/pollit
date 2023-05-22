export const checkNull = (value: string) => {
  if (!value || value.trim() === '') {
    return true;
  }

  return false;
};

export const checkEmail = (email: string) => {
  const emailRegex = /\S+@\S+\.\S+/;

  if (!emailRegex.test(email)) {
    return true;
  }

  return false;
};

export const checkUsername = (username: string) => {
  const specialRegex = /[^a-zA-Z0-9]/;

  if (specialRegex.test(username)) {
    return true;
  }

  return false;
};

export const checkLength = (value: string, min?: number, max?: number) => {
  if (min && max && (value.length < min || value.length > max)) {
    return true;
  } else if (min && value.length < min) {
    return true;
  } else if (max && value.length > max) {
    return true;
  }

  return false;
};
