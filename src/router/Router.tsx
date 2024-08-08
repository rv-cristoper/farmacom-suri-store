
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import LoginPage from "../login/LoginPage";
import CategoryPage from "../category/CategoryPage";
import ProductPage from "../product/ProductPage";
import Layout from "../components/Layout";
import RequireAuth from "../components/RequireAuth";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route element={<Layout />}>
                    <Route
                        path="/category"
                        element={
                            <RequireAuth>
                                <CategoryPage />
                            </RequireAuth>
                        }
                    />
                    <Route path="/product" element={<ProductPage />} />
                </Route>
                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />
            </Routes>
        </BrowserRouter>
    )
}