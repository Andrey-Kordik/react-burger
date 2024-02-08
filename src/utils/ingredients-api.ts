import { BASE_URL } from '../utils/constants';

class IngredientsApi {
  private headers: Record<string, string>;

  constructor({ headers }: { headers: Record<string, string> }) {
    this.headers = headers;
  }

  getIngredients() {
    return fetch(`${BASE_URL }/ingredients`, {
      headers: this.headers,
    })
      .then((res) => {
        return this._checkResult(res);
      });
  }

  private _checkResult(res: Response) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
}

export const ingredientsApi = new IngredientsApi({
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});