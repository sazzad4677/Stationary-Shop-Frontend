import {createBrowserRouter} from "react-router";
import App from "@/App.tsx";
import Home from "@/pages/Home";
import LoginForm from "@/pages/Auth/Login.tsx";
import RegisterForm from "@/pages/Auth/Register.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "login",
                element: <LoginForm/>
            },
            {
                path: "register",
                element: <RegisterForm/>
            },
        ]
    },
])

export default router;