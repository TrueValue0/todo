import Image from 'react-bootstrap/Image';
import React from 'react';

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
    return (
        <CustomToggle onClick={onClick}> <Image width='50px' src="https://www.pngkey.com/png/full/72-729716_user-avatar-png-graphic-free-download-icon.png" roundedCircle /></CustomToggle>
    )
}