import { useState } from 'react';

//Components
import { Alert, Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'react-bootstrap';
import { BiMenu, BiUser, BiLogOut } from 'react-icons/bi';
import { MenuList } from '@/components/layouts/MenuList';
import NavBottom from '@/components/layouts/NavBottom';
import Imagen from '@/components/layouts/Imagen';

//Utils
import { useLocation, useNavigate } from "react-router-dom";
import { useAlertContext } from '@/context/AlertProvider';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useAuth } from '@/context/AuthProvider';
import { useMenu } from "@/hooks/useMenu";

import '@/components/layouts/layout.css'

export default function Layout({ children }) {
    const movil = useMediaQuery('550');
    const [open, setOpen] = useState(false);
    const toogleMenu = () => setOpen(prev => !prev);
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const { pathname } = useLocation();
    const { navLista, navBottom } = useMenu();
    const { alert } = useAlertContext();

    const cerrarSesion = () => {
        logout();
        navigate('/login');
    }


    return (
        <>
            <div>
                <nav className={open ? 'open d-flex justify-content-between align-items-center' : 'd-flex justify-content-between align-items-center'}>
                    <div className="logo">
                        <BiMenu className='menu-icon' onClick={toogleMenu} />
                        <span className="logo-name text-capitalize">{navBottom.filter(obj => obj.path === pathname)[0].label}</span>
                    </div>
                    <div className="sidebar">
                        <div className="logo">
                            <BiMenu className='menu-icon' onClick={toogleMenu} />
                            <span className="logo-name">{navBottom.filter(obj => obj.path === pathname)[0].label}</span>
                        </div>
                        <div className="sidebar-content">
                            <ul className="lists">
                                <MenuList items={navLista} />
                            </ul>
                        </div>
                    </div>
                    <div className='d-flex gap-4 p-3 align-items-center'>
                        <span>{user.nombre}</span>
                        <Dropdown align='end'>
                            <DropdownToggle as={Imagen} />
                            <DropdownMenu style={{ right: 0 }} >
                                <DropdownItem onClick={() => navigate('/user')} className='text-center' eventKey='1'><BiUser className='fs-5' /> Perfil</DropdownItem>
                                <DropdownItem onClick={cerrarSesion} className='text-center' eventKey='2'> <BiLogOut className='fs-5' /> Salir</DropdownItem>
                                <DropdownItem disabled className='text-center' eventKey='1'>{user.rol}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </nav>
                <section className='overlay' onClick={toogleMenu}></section>
                {children}
                {alert.show && <Alert style={{ marginBottom: 90, zIndex: 2 }} className="position-absolute bottom-0 start-50 translate-middle" variant={alert.variant} dismissible>{alert.message}</Alert>}
                {movil && <NavBottom />}
            </div>
        </>
    )
}