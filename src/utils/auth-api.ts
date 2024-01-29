
class AuthApi {
  private url: string;

  constructor({ url }: { url: string }) {
    this.url = url;
  }

  private _checkResult(res: Response) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  }

  private getHeaders(): Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=utf-8');
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      headers.append('authorization', accessToken);
    }
    return headers;
  }


  getOrder(ids: string[]) {
    return fetch(`${this.url}/orders`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ ingredients: ids }),
    }).then((res) => {
      return this._checkResult(res);
    });
  }

  getCurrentOrder(number: number) {
    return fetch(`${this.url}/orders/:number`, {
      method: 'GET',
      headers: this.getHeaders(),
    }).then((res) => {
      return this._checkResult(res);
    });
  }

  refreshToken = () => {
    return fetch(`${this.url}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken'),
      }),
    }).then((res) => {
      return this._checkResult(res);
    });
  };

  private fetchWithRefresh = async (url: string, options: RequestInit) => {
    try {
      const res = await fetch(url, options);
      return await this._checkResult(res);
    } catch (err: any) {
      if (err.message === 'jwt expired') {
        const refreshData = await this.refreshToken();
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        localStorage.setItem('refreshToken', refreshData.refreshToken);
        localStorage.setItem('accessToken', refreshData.accessToken);
        options.headers = {
          ...options.headers,
          authorization: refreshData.accessToken,
        };
        const res = await fetch(url, options);
        return await this._checkResult(res);
      } else {
        return Promise.reject(err);
      }
    }
  };

  getUserData() {
    return this.fetchWithRefresh(`${this.url}/auth/user`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
  }

  editUserData(email: string, name: string, password: string) {
    return this.fetchWithRefresh(`${this.url}/auth/user`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify({ email, name, password }),
    });
  }

  register(name: string, email: string, password: string) {
    return this.fetchWithRefresh(`${this.url}/auth/register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        name,
        email,
        password,
        token: localStorage.getItem('refreshToken'),
      }),
    });
  }

  authorize(email: string, password: string) {
    return this.fetchWithRefresh(`${this.url}/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }

  logout(refreshToken: string) {
    const body = {
      token: refreshToken,
    };
    return this.fetchWithRefresh(`${this.url}/auth/logout`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
  }

  sendCode(email: string) {
    const body = {
      email,
    };
    return fetch(`${this.url}/password-reset`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
  }

  resetPassword(token: string, password: string) {
    const body = {
      token,
      password,
    };
    return fetch(`${this.url}/password-reset/reset`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
  }
}

export const authApi = new AuthApi({
  url: 'https://norma.nomoreparties.space/api',
});
