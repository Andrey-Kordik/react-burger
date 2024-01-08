import React, { FC, FormEvent } from 'react';
import commonStyles from '../login/login.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { resetPassword } from '../../services/auth/actions';


const ResetPassword: FC = () => {
  const [textValue, setTextValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const onIconClickPassword = () => {
    setTimeout(() => inputRef.current?.focus(), 0);
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //@ts-ignore
    dispatch(resetPassword(textValue, passwordValue));
  };

  return (
    <div className={commonStyles.login}>
      <div className={commonStyles.login_container}>
        <p className='text text_type_main-default mb-6'>Восстановление пароля</p>
        <form className={` ${commonStyles.form_container} mb-20`} onSubmit={handleSubmit}>
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
            minLength={6}
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

          <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
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
