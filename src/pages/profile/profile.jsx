import React from 'react';
import styles from './profile.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/auth/actions'
import { editUserData } from '../../services/auth/actions'

function Profile({user}) {
  const [emailValue, setEmailValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const [isValueChanged, setIsValueChanged] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    setNameValue(user.name);
    setEmailValue(user.email);
    setPasswordValue(user.password);
    setInitialValues({ name: user.name, email: user.email, password: user.password });
  }, [user]);



  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    dispatch(editUserData(emailValue, nameValue, passwordValue));
    setIsValueChanged(false);
  };

  const handleCancelChanges = () => {
    setNameValue(initialValues.name);
    setEmailValue(initialValues.email);
    setPasswordValue(initialValues.password);
    setIsValueChanged(false);
  };

  const handleInputChange = (value, inputName) => {
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

    if (
      (inputName === 'name' && value !== initialValues.name) ||
      (inputName === 'email' && value !== initialValues.email) ||
      (inputName === 'password' && value !== initialValues.password)
    ) {
      setIsValueChanged(true);
    } else {
      setIsValueChanged(false);
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
        <form className={styles.profile_form} onSubmit={handleSaveChanges}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={(e) => handleInputChange(e.target.value, 'name')}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass='mb-6'
            value={nameValue || ''}
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
            value={emailValue || ''}
            icon="EditIcon"
          />
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={(e) => handleInputChange(e.target.value, 'password')}
            name={'password'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass='mb-6'
            value={passwordValue || ''}
            minLength='6'
            icon="EditIcon"
          />
          <div className={styles.button_container}>
            {isValueChanged && (
              <>
                <Button
                  htmlType="button" type="secondary" size="small" onClick={handleCancelChanges}>Отменить</Button>
                <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
