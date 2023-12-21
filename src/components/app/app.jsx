import React from 'react';
import styles from './app.module.css';
import HomePage from '../../pages/home/home';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modals/modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { loadIngredients } from '../../services/ingredients/actions'
import { useEffect } from 'react';
import Preloader from '../Preloader/Preloader';
import Header from '../app-header/app-header';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from '../../pages/profile/profile';
import { checkUserAuth } from '../../services/auth/actions'
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route'
import { getUser } from '../../services/auth/actions'


function App() {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, ingredients } = useSelector((store) => store.ingredients);
  const ingredientsData = ingredients.data || [];

  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(getUser())
    dispatch(loadIngredients());
    dispatch(checkUserAuth());

  }, []);


  if (loading) {
    return < Preloader />;
  }

  if (!loading && error) {
    return <h2>{`Ошибка: ${error}`}</h2>;
  }

  const handleModalClose = () => {
    navigate(-1);
  };


  if (ingredientsData.length > 0) {
    return (
      <div className={styles.app}>
        <Header />
        <Routes location={background || location}>
          <Route path="/" element={<HomePage ingredientsData={ingredientsData} />} />
          <Route path='/ingredients/:ingredientId' element={<IngredientDetails />} />
          <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>


        {background && (
          <Routes>
            <Route path='/ingredients/:ingredientId'
              element={
                <Modal headerHeading='Детали ингридиента' onClose={handleModalClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}

      </div>
    );
  }

  return null;
}

export default App;
