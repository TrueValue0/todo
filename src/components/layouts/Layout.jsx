import { useState } from 'react';
import { BiMenu, BiUser, BiLogOut } from 'react-icons/bi';
import NavBottom from '@/components/layouts/NavBottom';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { NavLink } from '@/components/layouts/Navlink';
import { navLista } from "@/components/layouts/menu";
import { useAuth } from '@/context/AuthProvider';
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import '@/components/layouts/layout.css'
import { MenuList } from './MenuList';
import DropdownToggle from 'react-bootstrap/DropdownToggle'
import DropdownMenu from 'react-bootstrap/DropdownMenu'
import DropdownItem from 'react-bootstrap/DropdownItem'
import Dropdown from 'react-bootstrap/Dropdown';
import Imagen from '@/components/layouts/Imagen'

export default function Layout({ children }) {
    const movil = useMediaQuery('550');
    const [open, setOpen] = useState(false);
    const toogleMenu = () => setOpen(prev => !prev);
    const navigate = useNavigate();
    const { logout } = useAuth();

    const cerrarSesion = () => {
        logout();
        navigate('/login');
    }
    return (
        <>
            <div>
                <nav className={open ? 'open' : 'd-flex justify-content-between align-items-center'}>
                    <div className="logo">
                        <BiMenu className='menu-icon' onClick={toogleMenu} />
                        <span className="logo-name">Tareas</span>
                    </div>
                    <div className="sidebar">
                        <div className="logo">
                            <BiMenu className='menu-icon' onClick={toogleMenu} />
                            <span className="logo-name">Tareas</span>
                        </div>
                        <div className="sidebar-content">
                            <ul className="lists">
                                <MenuList items={navLista} />
                            </ul>
                            <div className="bottom-cotent" style={movil ? { marginBottom: 90 } : { marginBottom: 0 }}>
                                <li className="list">
                                    <NavLink to="/user">
                                        <BiUser className='icon' />
                                        <span className="link">Perfil</span>
                                    </NavLink>
                                </li>
                                <li className="list">
                                    <Button className="nav-link" onClick={cerrarSesion}>
                                        <BiLogOut className='icon' />
                                        <span className="link">Cerrar Sesion</span>
                                    </Button>
                                </li>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex gap-4 p-3'>
                        <Dropdown>
                            <DropdownToggle as={Imagen} />
                            <DropdownMenu>
                                <DropdownItem eventKey='1' >Home</DropdownItem>
                                <DropdownItem eventKey='2'>Click</DropdownItem>
                                <DropdownItem eventKey='3'>Nombre</DropdownItem>
                                <DropdownItem eventKey='4' disabled>Rol</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </nav>
                <section className='overlay' onClick={toogleMenu}></section>
                {children}
                {movil && <NavBottom />}
            </div>
        </>
    )
}