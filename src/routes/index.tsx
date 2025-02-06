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
import ProtectedRoute from "@/routes/ProtectedRoute.tsx";
import Dashboard from "@/pages/Dashboard";
import UsersPage from "@/pages/Dashboard/users/Users.component.tsx";
import ProductsPage from "@/pages/Dashboard/products/Products.component.tsx";
import OrdersPage from "@/pages/Dashboard/orders/Orders.components.tsx";
import CheckoutPage from "@/pages/Checkout";

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
                element: <PrivateRoute/>,
                children: [
                    {
                        index: true,
                        element: <CartPage/>
                    },
                    {
                        path: "checkout",
                        element: <CheckoutPage/>
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
                path: "dashboard",
                element: <ProtectedRoute allowedRoles={["admin"]}/>,
                children: [
                    {
                        index: true,
                        element: <Dashboard/>
                    },
                    {
                        path: "admin/users",
                        element: <UsersPage/>
                    },
                    {
                        path: "admin/products",
                        element: <ProductsPage/>
                    },{
                        path: "admin/orders",
                        element: <OrdersPage/>
                    },
                ]
            },

            {
                path: "order-placed",
                element: <OrderPlaced/>
            },
            {
                path: "*",
                element: <NotFound/>,
            },

        ]
    },
])

export default router;