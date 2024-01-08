import React from 'react';
import styles from './app.module.css';
import HomePage from '../../pages/home/home';
import { Route, Routes, useNavigate, useLocation, Navigate } from 'react-router-dom';
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
import Page404 from '../page404/page404';

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  key?: string;
  __v: number;
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //@ts-ignore
  const { loading, error, ingredients } = useSelector((store) => store.ingredients);
  const ingredientsData = ingredients.data || [];

  const background:string = location.state && location.state.background;
  //@ts-ignore
  const user = useSelector((state) => state.authReducer.user);
  const userName:string = user && user.name;
  //@ts-ignore
  const isPasswordReset = useSelector((state) => state.authReducer.isPasswordReset);

  useEffect(() => {
    dispatch(checkUserAuth() as any);
    dispatch(loadIngredients() as any);
    dispatch(getUser() as any);
  }, []);


  if (loading) {
    return <Preloader />;
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
        <Header userName={userName} />
        <Routes location={background || location}>
          <Route path="/" element={<HomePage ingredientsData={ingredientsData} />} />
          <Route path="/ingredients/:ingredientId" element={<IngredientDetails background={background}/>} />
          <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
          <Route path="/register" element={<OnlyUnAuth component={<Register />} />} />
          <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
          <Route path="/reset-password" element={isPasswordReset ? <OnlyUnAuth component={<ResetPassword />} /> : <Navigate to="/forgot-password" />} />
          <Route path="/profile" element={<OnlyAuth component={<Profile user={user} />} />} />
          <Route path="/*" element={< Page404 />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path="/ingredients/:ingredientId"
              element={
                <Modal headerHeading="Детали ингридиента" onClose={handleModalClose}>
                  <IngredientDetails background={background} />
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
