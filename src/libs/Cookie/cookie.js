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

const removeTokens = () => {
  return (
    cookie.remove('ACCESS_TOKEN'),
    cookie.remove('REFRESH_TOKEN')
  )
}

export {
  setCookie,
  getCookie,
  removeCookie,
  removeTokens
}