import React, { FC, useEffect } from 'react';
import styles from './profile.module.css';
import { logout } from '../../services/auth/actions'
import OrderList from '../../components/order-list/order-list'
import { Link, useMatch } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import ProfileForm from '../../components/profile-form/profile-form';
import { useDispatch, useSelector } from "../../services/hooks/hooks";
import { useLocation } from 'react-router-dom';
import { myOrdersConnect, myOrdersDisconnect } from '../../services/ws-my-orders/actions';
import Preloader from '../../components/Preloader/Preloader';
import { MY_ORDERS_SERVER_URL } from '../../utils/constants'


const Profile: FC = () => {
  const dispatch = useDispatch();

  const myloading = useSelector((state) => state.myOrders.loading);

  const location = useLocation();


  const handleLogout = () => {
    dispatch(logout());
  };

  const profileContainerWidth = location.pathname.includes('/profile/orders') ? '1240px' : '860px';
  const description = location.pathname.includes('/profile/orders') ? 'В этом разделе вы можете просмотреть свою историю заказов' : 'В этом разделе вы можете изменить свои персональные данные';


  return (
    <div className={styles.profile}>
      <div className={styles.profile_container} style={{ maxWidth: profileContainerWidth }}>
        <div className={styles.nav_container}>
          <div className={styles.profile_links}>
            <Link
              to="/profile"
              className={`${styles.profile_button} text text_type_main-medium ${window.location.pathname === '/profile' && styles.profile_button_active
                }`}
            >
              Профиль
            </Link>
            <Link
              to="/profile/orders"
              className={`${styles.profile_button} text text_type_main-medium ${window.location.pathname === '/profile/orders' && styles.profile_button_active
                }`}
            >
              История заказов
            </Link>
            <button className={`${styles.profile_button} text text_type_main-medium`} onClick={handleLogout}>
              Выход
            </button>
          </div>
          <p className='text text_type_main-default text_color_inactive'>{description}</p>
        </div>
        <Routes>
          <Route
            path="/"
            element={<ProfileForm />}
          />
          <Route
            path="/orders/"
            element={<OrderList />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;