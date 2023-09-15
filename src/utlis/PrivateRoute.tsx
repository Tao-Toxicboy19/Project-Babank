import { Navigate, Outlet } from 'react-router-dom'

type PrivateRouteProps = {
    token: string | null;
};

export default function PrivateRoute({ token }: PrivateRouteProps) {
    return (
        token ? <Outlet /> : <Navigate to='login' />
    )
}