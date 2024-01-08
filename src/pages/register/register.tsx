import React, { FC, FormEvent } from 'react';
import commonStyles from '../login/login.module.css'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../services/auth/actions';



const Register: FC = () => {
  const dispatch = useDispatch();
  //@ts-ignore
  const registerState = useSelector((state) => state.authReducer);
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [nameValue, setNameValue] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const onIconClickPassword = () => {
    setTimeout(() => inputRef.current?.focus(), 0);
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    //@ts-ignore
    dispatch(register(nameValue, emailValue, passwordValue));
  };

  useEffect(() => {
    setIsFormValid(!!(nameValue && emailValue && passwordValue));
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
            minLength={6} // изменение значения на числовое
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
