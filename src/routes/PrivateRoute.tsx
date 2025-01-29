import {Navigate, Outlet, useLocation} from 'react-router';
import {useAppSelector} from "@/redux/hooks.ts";
import {selectUser} from "@/redux/features/auth/auth.slice.ts";

const PrivateRoute = () => {
    const user = useAppSelector(selectUser)
    const location = useLocation();

    return user ? <Outlet /> : <Navigate to="/login" state={{ from: location }}/>;
};

export default PrivateRoute;