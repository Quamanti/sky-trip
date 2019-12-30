export const getCookies = () => {
  const cookies = {};
  document.cookie.split(';').forEach(cookie => {
    const [k, v] = cookie.split('=');
    cookies[k.trim()] = v;
  });

  return cookies;
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
