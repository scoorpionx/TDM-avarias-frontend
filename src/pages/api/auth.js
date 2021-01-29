import { Cookies } from 'react-cookie';
const cookies = new Cookies();

export const TOKEN_KEY = "@TDM-Token";
export const isAuthenticated = () => cookies.get(TOKEN_KEY) !== null;
export const getToken = () => {
  return cookies.get(TOKEN_KEY)
}
export const login = token => {
  cookies.set(TOKEN_KEY, token);
};