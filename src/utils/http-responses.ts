export const successResponse = (data: any, message = 'ok', status = 200) => {
  return {
    response: true,
    message,
    status,
    data,
  };
};

export const errorResponse = (error: any, message = 'error', status = 400) => {
  let errorMessage = message;

  if (error?.errors) {
    for (const key in error.errors) {
      if (key !== 'alive') {
        errorMessage = error.errors[key].message;

        break;
      }
    }
  } else if (error?.stack) {
    errorMessage = error.stack.split(/\n/)[0];
    errorMessage = errorMessage.replace('NotFoundException:', '');
  }

  return {
    status,
    response: false,
    message: errorMessage,
    error,
    data: null,
  };
};
