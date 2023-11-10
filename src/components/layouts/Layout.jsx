import { useEffect, useState } from 'react';
import { BiMenu, BiUser, BiLogOut } from 'react-icons/bi';
import DropdownToggle from 'react-bootstrap/DropdownToggle'
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';
import NavBottom from '@/components/layouts/NavBottom';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useMenu } from "@/hooks/useMenu";
import Imagen from '@/components/layouts/Imagen';
import { useAuth } from '@/context/AuthProvider';
import Dropdown from 'react-bootstrap/Dropdown';
import { useLocation, useNavigate } from "react-router-dom";
import { MenuList } from './MenuList';
import '@/components/layouts/layout.css'

export default function Layout({ children }) {
    const movil = useMediaQuery('550');
    const [open, setOpen] = useState(false);
    const toogleMenu = () => setOpen(prev => !prev);
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const { pathname } = useLocation();
    const { navLista, navBottom } = useMenu();

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
                                <DropdownItem disabled className='text-center' eventKey='1'> ROL</DropdownItem>
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