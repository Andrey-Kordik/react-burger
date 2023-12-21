class AuthApi {
  constructor({ url, headers }) {
    this.url = url;
    this.headers = headers;
  }


  _checkResult(res) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  }

  getUserData() {
    return this.fetchWithRefresh(`${this.url}/auth/user`, {
      method: "GET",
      headers: this.headers
    })
      .then(res => {
        return res;
      })
  }

  editUserData({ email, name, password }) {
    return this.fetchWithRefresh(`${this.url}/auth/user`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ email: email, name: name, password:password})
    })
      .then(res => {
        return res;
      })
  }

  register(name, email, password) {
    return this.fetchWithRefresh(`${this.url}/auth/register`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      })
    })
      .then(res => {
        return res;
      })
  }

  authorize(email, password) {
    return this.fetchWithRefresh(`${this.url}/auth/login`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => {
        return res;
      })
  }

  refreshToken() {
    return fetch(`${this.url}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    })
      .then(res => {
        return this._checkResult(res)
      })
  };

  fetchWithRefresh = async (url, options) => {
    try {
      const res = await fetch(url, options);
      return await this._checkResult(res);
    } catch (err) {
      if (err.message === "jwt expired") {
        const refreshData = await this.refreshToken(); //обновляем токен
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        localStorage.setItem("refreshToken", refreshData.refreshToken);
        localStorage.setItem("accessToken", refreshData.accessToken);
        options.headers.authorization = refreshData.accessToken;
        const res = await fetch(url, options); //повторяем запрос
        return await this._checkResult(res);
      } else {
        return Promise.reject(err);
      }
    }
  };

  logout(refreshToken) {
    const body = {
      token: refreshToken,
    };
    return this.fetchWithRefresh(`${this.url}/auth/logout`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body),
    })
      .then(res => {
        return res;
      });
  }


  sendCode(email) {
    const body = {
      email: email,
    };
    return fetch(`${this.url}/password-reset`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body),
    })
      .then(res => {
        return res;
      });
  }

  resetPassword(token, password) {
    const body = {
      token: token,
      password: password
    };
    return fetch(`${this.url}/password-reset/reset`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body),
    })
      .then(res => {
        return res;
      });
  }

}

export const authApi = new AuthApi({
  url: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    authorization: localStorage.getItem('accessToken')
  }
});