export const isAuthenticated = (store) => (
  store.Users.isAuthenticated
);

export const getUserData = (store) => ({
  name: store.Users.name,
  surname: store.Users.surname,
  login: store.Users.login,
  email: store.Users.email,
});
