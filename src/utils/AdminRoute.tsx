import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store/store";

type Props = {};

export default function AdminRoute({ }: Props) {
    const rolesReducer = useSelector((state: RootState) => state.rolesReducer);

    const allowedRoles = ['Administrator', 'Contributor'];

    return allowedRoles.includes(rolesReducer.result?.role) ? <Outlet /> : <Navigate to='/' />;
}
