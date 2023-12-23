class IngredientsApi {
  constructor({ url, headers }) {
    this.url = url;
    this.headers = headers;
  }

  getIngredients() {
    return fetch(`${this.url}/ingredients`, {
      headers: this.headers,

    })
      .then(res => {
        return this._checkResult(res)
      })
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`)
  }

}

export const ingredientsApi = new IngredientsApi({
  url: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
});