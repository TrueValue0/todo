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

    const selectUser = (e) => {
        console.log(e);
    }
    return (
        <>
            <div>
                <nav className={open ? 'open d-flex justify-content-between align-items-center' : 'd-flex justify-content-between align-items-center'}>
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
                        </div>
                    </div>
                    <div className='d-flex gap-4 p-3 align-items-center'>
                        <span>Nombre</span>
                        <Dropdown align='end'>
                            <DropdownToggle as={Imagen} />
                            <DropdownMenu style={{ right: 0 }} onSelect={selectUser} >
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