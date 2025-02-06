import {Navigate, Outlet, useLocation} from 'react-router';
import {useAppSelector} from "@/redux/hooks.ts";
import {loggedInUser} from "@/redux/features/auth/auth.slice.ts";

const ProtectedRoute = ({allowedRoles}: { allowedRoles: string[] }) => {
    const user = useAppSelector(loggedInUser)
    const location = useLocation();
    if (!user) {
        return <Navigate to="/login" state={{ from: location }}/>;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/"/>;
    }

    return <Outlet/>;
};

export default ProtectedRoute;