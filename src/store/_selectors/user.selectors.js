export const isAuthenticated = (store) => (
  store.Users.isAuthenticated
);

export const getUserData = (store) => ({
  firstName: store.Users.firstName,
  lastName: store.Users.lastName,
  username: store.Users.username,
  email: store.Users.email,
});
