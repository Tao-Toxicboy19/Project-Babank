import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store/store";

type Props = {};

export default function AdminRouteV2({ }: Props) {
    const rolesReducer = useSelector((state: RootState) => state.rolesReducer);

    return rolesReducer.result?.role === 'Administrator' ? <Outlet /> : <Navigate to='/' />;
}
