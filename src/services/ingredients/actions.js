import { ingredientsApi} from '../../components/utils/ingredients-api'

export const INGREDIENTS_LOAD_SUCCESS = "TASKS_LOAD_SUCCESS";
export const INGREDIENTS_LOADING = "TASKS_LOADING";
export const INGREDIENTS_ERROR = "TASKS_ERROR";

export const loadIngredients = () => (dispatch) => {
  dispatch({type: INGREDIENTS_LOADING});
  return ingredientsApi.getIngredients().then(res => {
      dispatch({
          type: INGREDIENTS_LOAD_SUCCESS,
          payload: res
      });
  })
  .catch(error => {
      dispatch({
          type: INGREDIENTS_ERROR,
          payload: error.message
      });
  });
};

