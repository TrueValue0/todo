import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { BiCopy, BiCheck } from "react-icons/bi";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default function Snippet({ content }) {

    const [copiado, setCopiado] = useState(false)

    const handleCopyClick = () => {
        navigator.clipboard.writeText(content)
        setCopiado(true)
        setTimeout(() => {
            setCopiado(false)
        }, 1000)
    };

    return (
        <Card className='d-inline-block my-1' style={{ minWidth: '14rem' }}>
            <Card.Body className='p-2'>
                <Card.Text className='d-flex justify-content-between align-items-center'>
                    {content}
                    {
                        copiado ?
                            <BiCheck style={{ fontSize: 20 }} color='#029d00' className='text-end' /> :
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={<Tooltip id='tooltip-top'>¡Copiar!</Tooltip>}
                            ><div><BiCopy style={{ fontSize: 17 }} onClick={handleCopyClick} cursor='pointer' className='text-end' /></div></OverlayTrigger>
                    }</Card.Text>
            </Card.Body>
        </Card>
    );
};
