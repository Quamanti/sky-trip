export const getMessage = (store) => ({
  message: store.Application.message,
  error: store.Application.error,
});
