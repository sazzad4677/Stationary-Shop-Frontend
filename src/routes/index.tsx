import {createBrowserRouter} from "react-router";
import App from "@/App.tsx";
import Home from "@/pages/Home";
import LoginForm from "@/pages/Auth/Login.tsx";
import RegisterForm from "@/pages/Auth/Register.tsx";
import AboutPage from "@/pages/AboutUs";
import AllProductsPage from "@/pages/Products";
import CartPage from "@/pages/Cart";

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
            {
                path: "about",
                element: <AboutPage/>
            },
            {
                path: "products",
                element: <AllProductsPage/>
            },
            {
                path: "cart",
                element: <CartPage/>
            }
        ]
    },
])

export default router;