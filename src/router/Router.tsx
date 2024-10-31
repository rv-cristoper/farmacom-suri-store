
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ProductPage from "../pages/ProductPage";
import Layout from "../modules/layout/Layout";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route element={<Layout />}>
                    <Route
                        path="/"
                        element={
                            <div>Home</div>
                        }
                    />
                    <Route
                        path="/products"
                        element={
                            <ProductPage />
                        }
                    />
                </Route>
                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />
            </Routes>
        </BrowserRouter>
    )
}