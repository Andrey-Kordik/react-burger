import React from 'react';
import commonStyles from './login.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../services/auth/actions'


function Login() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginState = useSelector(state => state.authReducer);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsFormValid(emailValue && passwordValue);
  }, [emailValue, passwordValue]);

  const onIconClickPassword = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsSubmitted(true); // Устанавливаем флаг сабмита формы
    dispatch(login(emailValue, passwordValue));
  };

  return (
    <div className={commonStyles.login}>
      <div className={commonStyles.login_container}>
        <p className='text text_type_main-default mb-6'>Вход</p>
        <form className={`${commonStyles.form_container} mb-20`} onSubmit={handleLogin}>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={(e) => setEmailValue(e.target.value)}
            name={'email'}
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
            size={'default'}
            icon={showPassword ? 'HideIcon' : 'ShowIcon'}
            ref={inputRef}
            onIconClick={onIconClickPassword}
            extraClass='mb-6'
            value={passwordValue}
            required
            minLength='6'
          />
          <Button type="primary" size="medium" htmlType="submit" disabled={!isFormValid || loginState.loading}>
            {loginState.loading ? 'Загрузка' : 'Войти'}
          </Button>
          {isSubmitted && loginState.error && <p className={commonStyles.error}>{loginState.error}</p>}
        </form>
        <div className={`${commonStyles.link_container} mb-4`}>
          <p className='text text_type_main-default text_color_inactive mr-2'>Вы - новый пользователь?</p>
          <Link className={commonStyles.login_link} to="/register">Зарегистрироваться</Link>
        </div>
        <div className={`${commonStyles.link_container} mb-4`}>
          <p className='text text_type_main-default text_color_inactive mr-2'>Забыли пароль?</p>
          <Link className={commonStyles.login_link} to="/forgot-password">Восстановить пароль</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;