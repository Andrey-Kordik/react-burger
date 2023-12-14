import React from 'react';
import styles from './login.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';


function Login() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);

  const onIconClickPassword = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.login}>
      <div className={styles.login_container}>
        <p className='text text_type_main-default mb-6'>Вход</p>
        <form className={` ${styles.form_container} mb-20`}>
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
          />
          <Button htmlType="button" type="primary" size="medium">Войти</Button>
        </form>
        <div className={`${styles.link_container} mb-4`}>
          <p className='text text_type_main-default text_color_inactive mr-2'>Вы - новый пользователь?</p>
          <Link className={styles.login_link}>Зарегистрироваться</Link>
        </div>
        <div className={`${styles.link_container} mb-4`}>
          <p className='text text_type_main-default text_color_inactive mr-2'>Забыли пароль?</p>
          <Link className={styles.login_link}>Восстановить пароль</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;