import { Navigate, Outlet } from 'react-router-dom'

type Props = {}

export default function PrivateRoute({ }: Props) {
    let auth = { 'token': false }
    return (
        auth.token ? <Outlet /> : <Navigate to='login' />
    )
}