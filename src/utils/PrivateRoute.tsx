import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'
import { loginSelector } from '../store/slices/auth/loginSlice';

type PrivateRouteProps = {};

export default function PrivateRoute({ }: PrivateRouteProps) {
    const loginReducer = useSelector(loginSelector)

    return (
        (loginReducer.data) ? <Outlet /> : <Navigate to='login' />
    )
}