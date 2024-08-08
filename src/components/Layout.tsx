import {
    Link,
    Outlet,
} from "react-router-dom";

export default function Layout() {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/category">Categorías</Link>
                </li>
                <li>
                    <Link to="/product">Productos</Link>
                </li>
            </ul>
            <Outlet />
        </div>
    )
}