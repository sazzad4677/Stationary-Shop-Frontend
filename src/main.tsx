import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {Provider} from 'react-redux'
import {persistor, store} from './redux/store.ts';
import {PersistGate} from 'redux-persist/integration/react'
import router from "@/routes";
import {RouterProvider} from "react-router/dom";
import {Toaster} from "react-hot-toast";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <RouterProvider router={router}/>
                    <Toaster/>
                </PersistGate>
            </Provider>
    </StrictMode>,
)
