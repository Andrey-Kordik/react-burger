import React, { FC, FormEvent } from 'react';
import styles from './profile.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/auth/actions'
import { editUserData, getUser } from '../../services/auth/actions'

interface IUser {
  name: string;
  email: string;
  password: string;
}

interface ProfileProps {
  user: IUser;
}

const Profile: FC<ProfileProps> = ({ user }) => {

  const [emailValue, setEmailValue] = useState<string>('');
  const [nameValue, setNameValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');

  const [isValueChanged, setIsValueChanged] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<IUser>({ email: '', name: '', password: '' });

  const dispatch = useDispatch();

  const handleLogout = () => {
    //@ts-ignore
    dispatch(logout());
  };

  const handleSaveChanges = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //@ts-ignore
    dispatch(editUserData(emailValue, nameValue, passwordValue));
    setIsValueChanged(false);

    setTimeout(() => {
      //@ts-ignore
      dispatch(getUser());
    }, 1000);
  };

  useEffect(() => {
    setNameValue(user.name);
    setEmailValue(user.email);
    setPasswordValue(user.password);
    setInitialValues({ name: user.name, email: user.email, password: user.password });

  }, [user]);

  const handleCancelChanges = () => {
    setNameValue(initialValues.name);
    setEmailValue(initialValues.email);
    setPasswordValue(initialValues.password);
    setIsValueChanged(false);
  };

  const handleInputChange = (value: string, inputName: string) => {
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
            <NavLink className={` ${styles.profile_link} text text_type_main-medium`} to='#'>Профиль</NavLink>
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
            minLength={6}
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
