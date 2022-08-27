import { HOST_API } from "../../utils/constante";
import { TOKEN } from "../../utils/constante";
import jwtDecode from "jwt-decode";

export function signUpApi(user) {
  const url = `${HOST_API}/registro`;
  const tempUser = {
    ...user,
    email: user.email.toLowerCase(),
    fechaNacimiento: new Date(),
  };

  delete tempUser.repeatPassword;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tempUser),
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        return {
          code: 404,
          message: "Email no disponible",
        };
      }
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
}

export function signInAPI(user) {
  const path = `${HOST_API}/login`;

  const data = {
    ...user,
    email: user.email.toLowerCase(),
  };

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return fetch(path, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }

      return {
        code: 404,
        message: "Email o password incorrectos!",
      };
    })
    .then((result) => result)
    .catch((error) => error);
}

export function setTokenAPI(token) {
  localStorage.setItem(TOKEN, token);
}

export function getTokenAPI() {
  return localStorage.getItem(TOKEN);
}

export function logOutAPI() {
  localStorage.removeItem(TOKEN);
}

export function isLoggedIn() {
  const token = getTokenAPI();
  if (!token) {
    logOutAPI();
    return null;
  }

  if (isExpired(token)) {
    logOutAPI();
  }

  return jwtDecode(token);
}

export function isExpired(token) {
  const { exp } = jwtDecode(token);
  return exp * 1000 - Date.now() < 0;
}
