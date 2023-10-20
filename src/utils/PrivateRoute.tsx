import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from '../store/store';

type PrivateRouteProps = {
};

export default function PrivateRoute({ }: PrivateRouteProps) {
    const loginReducer = useSelector((state: RootState) => state.login);

    return (
        (loginReducer.data) ? <Outlet /> : <Navigate to='login' />
    )
}