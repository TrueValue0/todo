import Image from 'react-bootstrap/Image';
import React from 'react';
import { useAuth } from '@/context/AuthProvider';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
    </a>
));

export default function Imagen({ children, onClick }) {
    const { user } = useAuth()
    return (
        <CustomToggle onClick={onClick}> <Image width='50px' src={user.avatar} roundedCircle /></CustomToggle>
    )
}