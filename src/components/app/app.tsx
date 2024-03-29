import React from 'react';
import styles from './app.module.css';
import HomePage from '../../pages/home/home';
import { Route, Routes, useNavigate, useLocation, Navigate, useMatch } from 'react-router-dom';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modals/modal/modal';
import { useDispatch, useSelector } from "../../services/hooks/hooks";
import { loadIngredients } from '../../services/ingredients/actions'
import { useEffect } from 'react';
import Preloader from '../Preloader/Preloader';
import Header from '../app-header/app-header';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import { checkUserAuth } from '../../services/auth/actions'
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route'
import { getUser } from '../../services/auth/actions'
import Page404 from '../page404/page404';
import Orders from '../../pages/orders/orders';
import OrderModal from '../order-modal/order-modal';
import Profile from '../../pages/profile/profile';


function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, ingredients } = useSelector((store) => store.ingredients);


  const background: string = location.state && location.state.background;


  const isPasswordReset = useSelector((state) => state.authReducer.isPasswordReset);

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(loadIngredients());

  }, [dispatch]);


  if (loading) {
    return <Preloader />;
  }

  if (!loading && error) {
    return <h2>{`Ошибка: ${error}`}</h2>;
  }

  const handleModalClose = () => {
    navigate(-1);
  };

  if (ingredients.length > 0) {
    return (
      <div className={styles.app}>
        <Header/>
        <Routes location={background || location}>
          <Route path="/" element={<HomePage ingredientsData={ingredients} />} />
          <Route path="/ingredients/:ingredientId" element={<IngredientDetails background={background} ingredients={ingredients} />} />
          <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
          <Route path="/register" element={<OnlyUnAuth component={<Register />} />} />
          <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
          <Route path="/reset-password" element={isPasswordReset ? <OnlyUnAuth component={<ResetPassword />} /> : <Navigate to="/forgot-password" />} />
          <Route path="/profile/*" element={<OnlyAuth component={<Profile />} />} />
          <Route path="/feed" element={<Orders />} />
          <Route path="/feed/:number" element={<OrderModal  background={background} />} />
          <Route path="/profile/orders/:number" element={<OnlyAuth component={<OrderModal background={background} />} />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path="/ingredients/:ingredientId"
              element={
                <Modal headerHeading="Детали ингридиента" onClose={handleModalClose}>
                  <IngredientDetails background={background} ingredients={ingredients} />
                </Modal>
              }
            />
            <Route
              path="/feed/:number"
              element={
                <Modal headerHeading="" onClose={handleModalClose}>
                  <OrderModal  background={background} />
                </Modal>
              }
            />
            <Route
              path="/profile/orders/:number"
              element={
                <Modal headerHeading="" onClose={handleModalClose}>
                  <OrderModal background={background} />
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

export default App