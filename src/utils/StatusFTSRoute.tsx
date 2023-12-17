import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { roleSelector } from "../store/slices/auth/rolesSlice";

type Props = {};

export default function StatusFTS({ }: Props) {
    const rolesReducer = useSelector(roleSelector)

    return rolesReducer.result?.ftsId ? <Outlet /> : <Navigate to='/' />;
}
