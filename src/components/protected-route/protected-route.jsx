import { useDispatch, useSelector } from 'react-redux';
import Preloader from '../Preloader/Preloader';
import { Route, Routes, useNavigate, useLocation, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ onlyUnAuth = false, component }) => {
  const isAuthChecked = useSelector(state => state.authReducer.isAuthChecked);
  const user = useSelector(state => state.authReducer.user);
  const location = useLocation()

  if (!isAuthChecked) {
    return Preloader
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } }
    return <Navigate to={from} />
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={'/login'} state={{ from: location }} />
  }

return component
}

export const OnlyAuth = ProtectedRoute

export const OnlyUnAuth = ({component}) => <ProtectedRoute onlyUnAuth={true} component= {component} />