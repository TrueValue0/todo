import { NavLink as Nav } from "react-router-dom";
import '@/components/layouts/navBottom.css'
export function NavLink({ to, children, ...props }) {
    return (
        <Nav to={to} {...props} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            {children}
        </Nav>
    )
}

export function BottomLink({ to, children, ...props }) {
    return (
        <Nav to={to} {...props} className={({ isActive }) => isActive ? 'link-item active' : 'link-item'}>
            {children}
        </Nav>
    )
}