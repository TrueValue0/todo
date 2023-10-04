import { NavLink, BottomLink } from '@/components/layouts/Navlink';
import '@/components/layouts/navBottom.css';

export function MenuList({ items = [] }) {
    return (
        items.map(({ path, Icon, label }, index) => (
            <li key={index} className="list">
                <NavLink to={path}>
                    <Icon className='icon' />
                    <span className="link">{label}</span>
                </NavLink>
            </li>
        ))
    )
}

export function BottomList({ items = [] }) {
    return (
        items.map(({ path, Icon, label }, index) => (
            <li key={index}>
                <BottomLink to={path}>
                    <Icon className='link-icon' />
                    <span className="link-text">{label}</span>
                </BottomLink>
            </li>
        ))
    )
}