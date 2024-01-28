import React, { FC, FormEvent, useState, useEffect } from 'react';
import { IUser } from '../../services/types/types';
import styles from './profile-form.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from "../../services/hooks/hooks";
import { editUserData, getUser } from '../../services/auth/actions'
import { ProfileProps } from '../../components/profile-routes/profile-routes';

const ProfileForm: FC<ProfileProps> = ({ user }) => {

  const [emailValue, setEmailValue] = useState<string>('');
  const [nameValue, setNameValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [isValueChanged, setIsValueChanged] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<IUser>({ email: '', name: '', password: '' });

  const dispatch = useDispatch();

  const handleSaveChanges = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(editUserData(emailValue, nameValue, passwordValue));
    setIsValueChanged(false);

    setTimeout(() => {
      dispatch(getUser());
    }, 500);
  };

if(user) {
  useEffect(() => {
    setNameValue(user.name);
    setEmailValue(user.email);
    setPasswordValue(user.password);
    setInitialValues({ name: user.name, email: user.email, password: user.password });

  }, [user]);
}

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
  );
};

export default ProfileForm;