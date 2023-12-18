import React from 'react';
import commonStyles from '../login/login.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';


function ForgotPassword() {
  const [emailValue, setEmailValue] = useState('');

  return (
    <div className={commonStyles.login}>
      <div className={commonStyles.login_container}>
        <p className='text text_type_main-default mb-6'>Восстановление пароля</p>
        <form className={` ${commonStyles.form_container} mb-20`}>
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
          <Button htmlType="button" type="primary" size="medium">Восстановить</Button>
        </form>
        <div className={`${commonStyles.link_container} mb-4`}>
          <p className='text text_type_main-default text_color_inactive mr-2'>Вспомнили пароль?</p>
          <Link className={commonStyles.login_link} to="/login">Войти</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;