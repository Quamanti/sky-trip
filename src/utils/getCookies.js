export const getCookies = () => {
  const cookies = {};
  document.cookie.split(';').forEach(cookie => {
    const [k, v] = cookie.split('=');
    cookies[k.trim()] = v;
  });

  return cookies;
};
