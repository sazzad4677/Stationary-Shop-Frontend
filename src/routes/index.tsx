import {createBrowserRouter} from "react-router";
import App from "@/App.tsx";
import Home from "@/pages/Home";
import LoginForm from "@/pages/Auth/Login.tsx";
import RegisterForm from "@/pages/Auth/Register.tsx";
import AboutPage from "@/pages/AboutUs";
import AllProductsPage from "@/pages/Products";
import CartPage from "@/pages/Cart";
import OrderPlaced from "@/pages/OrderPlaced";
import ProductDetailsPage from "@/pages/ProductDetails";
import PrivateRoute from "@/routes/PrivateRoute.tsx";
import NotFound from "@/pages/NotFound";
import ProfilePage from "@/pages/Profile";

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
                path: "products/:id",
                element: <ProductDetailsPage/>
            },
            {
                path: "cart",
                element: <PrivateRoute/> ,
                children: [
                    {
                        index: true,
                        element: <CartPage/>
                    }
                ]
            },
            {
                path: "profile",
                element: <PrivateRoute/>,
                children: [
                    {
                        index: true,
                        element: <ProfilePage/>
                    }
                ]
            },
            {
                path: "order-placed",
                element: <OrderPlaced/>
            },
            {
                path: "*",
                element: <NotFound />,
            },

        ]
    },
])

export default router;