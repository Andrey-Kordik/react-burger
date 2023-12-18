import React from 'react';
import commonStyles from '../login/login.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';


function ResetPassword() {
  const [textValue, setTextValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);

  const onIconClickPassword = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    setShowPassword(!showPassword);
  };

  return (
    <div className={commonStyles.login}>
      <div className={commonStyles.login_container}>
        <p className='text text_type_main-default mb-6'>Восстановление пароля</p>
        <form className={` ${commonStyles.form_container} mb-20`}>
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
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={(e) => setTextValue(e.target.value)}
            name={'code'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass='mb-6'
            value={textValue}
            required
          />

          <Button htmlType="button" type="primary" size="medium">Сохранить</Button>
        </form>
        <div className={`${commonStyles.link_container} mb-4`}>
          <p className='text text_type_main-default text_color_inactive mr-2'>Вспомнили пароль?</p>
          <Link className={commonStyles.login_link} to="/login">Войти</Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;