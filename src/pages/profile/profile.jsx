import React from 'react';
import styles from './profile.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/auth/actions'

function Profile() {
  const [emailValue, setEmailValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isValueChanged, setIsValueChanged] = useState(false); // добавьте состояние для отслеживания изменений в инпутах
  const dispatch = useDispatch()
  const user = useSelector(state => state.authReducer.user);


  useState(() => {
    setNameValue(user.name);
    setEmailValue(user.email);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleInputChange = (value, inputName) => {
    if (
      (inputName === 'name' && value !== user.name) ||
      (inputName === 'email' && value !== user.email) ||
      (inputName === 'password' && value !== passwordValue)
    ) {
      setIsValueChanged(true);
    } else {
      setIsValueChanged(false);
    }

    switch (inputName) {
      case 'name':
        setNameValue(value);
        break;
      case 'email':
        setEmailValue(value);
        break;
      case 'password':
        setPasswordValue(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.profile}>
      <div className={styles.profile_container}>
        <div className={styles.nav_container}>
          <div className={styles.profile_links}>
            <NavLink className={` ${styles.profile_link} text text_type_main-medium`}>Профиль</NavLink>
            <button className={` ${styles.profile_logout} text text_type_main-medium`} >История заказов</button>
            <button className={` ${styles.profile_logout} text text_type_main-medium`} onClick={handleLogout}>Выход</button>
          </div>
          <p className='text text_type_main-default text_color_inactive'>В этом разделе вы можете изменить свои персональные данные</p>
        </div>
        <form className={styles.profile_form}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={(e) => handleInputChange(e.target.value, 'name')}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass='mb-6'
            value={nameValue}
            required
            icon="EditIcon"
          />
          <Input
            type={'email'}
            placeholder={'Логин'}
            onChange={(e) => handleInputChange(e.target.value, 'email')}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass='mb-6'
            value={emailValue}
            required
            icon="EditIcon"
          />
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder={'Пароль'}
            onChange={(e) => handleInputChange(e.target.value, 'password')}
            name={'password'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass='mb-6'
            value={passwordValue}
            required
            minLength='6'
            icon="EditIcon"
          />
          <div className={styles.button_container}>
            {/* Проверяем, были ли изменения в инпутах */}
            {isValueChanged && (
              <>
                <Button htmlType="button" type="secondary" size="small">Отменить</Button>
                <Button htmlType="button" type="primary" size="medium">Сохранить</Button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;