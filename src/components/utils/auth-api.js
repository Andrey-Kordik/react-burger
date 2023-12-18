class AuthApi {
  constructor({ url, headers }) {
    this.url = url;
    this.headers = headers;
  }


  _checkResult(res) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  }

  getUserData() {
    return fetch(`${this.url}/auth/user`, {
      method: "GET",
      headers: this.headers
    })
      .then(res => {
        return this._checkResult(res)
      })
  }

  editUserData({ email, name }) {
    return fetch(`${this.url}/auth/user`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ email: email, name: name })
    })
      .then(res => {
        return this._checkResult(res)
      })
  }

  register(name, email, password) {
    return fetch(`${this.url}/auth/register`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      })
    })
      .then(res => {
        return this._checkResult(res)
      })
  }

  authorize(email, password) {
    return fetch(`${this.url}/auth/login`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => {
        return this._checkResult(res)
      })
  }

  refreshToken () {
    return fetch(`${this.url}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    }).then(checkReponse);
  };

   fetchWithRefresh = async (url, options) => {
    try {
      const res = await fetch(url, options);
      return await checkReponse(res);
    } catch (err) {
      if (err.message === "jwt expired") {
        const refreshData = await refreshToken(); //обновляем токен
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        localStorage.setItem("refreshToken", refreshData.refreshToken);
        localStorage.setItem("accessToken", refreshData.accessToken);
        options.headers.authorization = refreshData.accessToken;
        const res = await fetch(url, options); //повторяем запрос
        return await checkReponse(res);
      } else {
        return Promise.reject(err);
      }
    }
  };

  logout() {
    return fetch(`${this.url}/auth/logout`, {
      method: 'POST',
      headers: this._headers,
    })
      .then(res => {
        return this._checkResult(res)
      })
  };
}

export const authApi = new AuthApi({
  url: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    authorization: localStorage.getItem('accessToken')
  }
});