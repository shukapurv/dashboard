import { Route, Navigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

function RouteGuard({ element: Element, ...props }: any) {
  const userInfo = localStorage.getItem('userData');
  const { showToast } = useToast();
  if (!userInfo) {
    showToast('Enter your details first!');
    return <Navigate to="/" replace/>;
  }

  return props.children;
}

export default RouteGuard;
