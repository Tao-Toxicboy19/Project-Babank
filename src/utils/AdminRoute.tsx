import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { roleSelector } from "../store/slices/auth/rolesSlice";

type Props = {};

export default function AdminRoute({ }: Props) {
    const rolesReducer = useSelector(roleSelector)

    const allowedRoles = ['Administrator', 'Contributor'];

    return allowedRoles.includes(rolesReducer.result?.role || '') ? <Outlet /> : <Navigate to='/' />;
}