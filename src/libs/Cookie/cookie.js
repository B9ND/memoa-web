import { Cookies } from "react-cookie";

const cookie = new Cookies();

const setCookie = (name, value, options) => {
  return cookie.set(name, value, {...options})
}
const getCookie = (name) => {
  return cookie.get(name)
}
const removeCookie = (name) => {
  return cookie.remove(name)
}

export {
  setCookie,
  getCookie,
  removeCookie
}