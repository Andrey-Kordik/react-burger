import React from 'react';
import styles from './register.module.css';
import commonStyles from '../login/login.module.css'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../services/auth/actions';


function Register() {
  const dispatch = useDispatch();
  const registerState = useSelector(state => state.authReducer);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const inputRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onIconClickPassword = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(nameValue, emailValue, passwordValue))
  };

  useEffect(() => {
    setIsFormValid(nameValue && emailValue && passwordValue);
  }, [nameValue, emailValue, passwordValue]);

  return (
    <div className={commonStyles.login}>
      <div className={commonStyles.login_container}>
        <p className='text text_type_main-default mb-6'>Регистрация</p>
        <form className={` ${commonStyles.form_container} mb-20`} onSubmit={handleSubmit}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={(e) => setNameValue(e.target.value)}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass='mb-6'
            value={nameValue}
            required
          />
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={(e) => setEmailValue(e.target.value)}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass='mb-6'
            value={emailValue}
            required
          />
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder={'Пароль'}
            onChange={(e) => setPasswordValue(e.target.value)}
            name={'password'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            icon={showPassword ? 'HideIcon' : 'ShowIcon'}
            ref={inputRef}
            onIconClick={onIconClickPassword}
            extraClass='mb-6'
            value={passwordValue}
            required
            minLength='6'
          />
          <Button type="primary" size="medium" htmlType="submit" disabled={!isFormValid || registerState.loading}>
            {registerState.loading ? 'Загрузка' : 'Зарегистрироваться'}
          </Button>
          {isSubmitted && registerState.error && <p className={commonStyles.error}>{registerState.error}</p>}
        </form>
        <div className={`${commonStyles.link_container} mb-4`}>
          <p className='text text_type_main-default text_color_inactive mr-2'>Уже зарегистрированы?</p>
          <Link className={commonStyles.login_link} to="/login">Войти</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
