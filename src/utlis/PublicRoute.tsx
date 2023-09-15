import { Navigate, Outlet } from "react-router-dom";

type PrivateRouteProps = {
    token: string | null;
};
export default function PublicRoute({ token }: PrivateRouteProps) {
    return (
        token ? <Navigate to='/' /> : <Outlet />
    )
}