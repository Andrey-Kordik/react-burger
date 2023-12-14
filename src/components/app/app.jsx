import React from 'react';
import styles from './app.module.css';
import Header from '../app-header/app-header';
import HomePage from '../../pages/home';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modals/modal/modal';


function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };

  return (
    <div className={styles.app}>
   <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path='/ingredients/:ingredientId'
               element={<IngredientDetails />} />
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

export default App;
