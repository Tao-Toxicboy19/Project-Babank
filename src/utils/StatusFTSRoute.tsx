import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store/store";

type Props = {};

export default function StatusFTS({ }: Props) {
    const rolesReducer = useSelector((state: RootState) => state.rolesReducer);

    return rolesReducer.result?.ftsId ? <Outlet /> : <Navigate to='/' />;
}
