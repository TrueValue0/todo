import React, { useState } from 'react';
import { BiTrash, BiPencil, BiCheck } from 'react-icons/bi';
import { Button, Form } from 'react-bootstrap';

export default function Plaficicacion({ lista, setLista }) {
    const [nuevaEmpresa, setNuevaEmpresa] = useState('');
    const [empresas, setEmpresas] = useState(lista);
    const [editando, setEditando] = useState({
        indice: null,
        contenido: ''
    });

    const anyadir = () => {
        const nuevasEmpresas = [...empresas, nuevaEmpresa];
        setLista(nuevasEmpresas);
        setEmpresas(nuevasEmpresas);
        setNuevaEmpresa('');
    }

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            anyadir();
        }
    };

    const handleEdit = (index, contenido) => {
        setEditando({
            indice: index,
            contenido: contenido
        });
    };

    const handleSaveEdit = () => {
        const nuevasEmpresas = [...empresas];
        nuevasEmpresas[editando.indice] = editando.contenido;
        setEmpresas(nuevasEmpresas);
        setLista(nuevasEmpresas);
        setEditando({
            indice: null,
            contenido: ''
        });
    };

    const handleDelete = (index) => {
        const nuevasEmpresas = empresas.filter((_, i) => i !== index);
        setEmpresas(nuevasEmpresas);
        setLista(nuevasEmpresas);
        setEditando({
            indice: null,
            contenido: ''
        });
    };

    return (
        <>
            <Form.Label>Planificacion: </Form.Label>
            <Form.Group className='d-flex gap-3'>
                <Form.Control
                    type="text"
                    value={nuevaEmpresa}
                    onChange={(e) => setNuevaEmpresa(e.target.value)}
                    onKeyDown={handleEnter}
                    placeholder="Escribir cliente y presionar Enter"
                />
                <Button onClick={anyadir}>Añadir</Button>
            </Form.Group>
            <ol>
                {empresas.map((empresa, index) => (
                    <li key={index} style={{ fontSize: 18 }} className='my-1 d-flex gap-2'>
                        {editando.indice === index ? (
                            <input
                                type="text"
                                value={editando.contenido}
                                onChange={(e) => setEditando({ ...editando, contenido: e.target.value })}
                                onBlur={handleSaveEdit}
                            />
                        ) : (
                            <span>{empresa}</span>
                        )}
                        <div className='d-flex gap-1'>
                            {editando.indice === index ? (
                                <BiCheck onClick={handleSaveEdit} style={{ fontSize: 22, cursor: 'pointer', color: '#10b521' }} />
                            ) : (
                                <>
                                    <BiPencil onClick={() => handleEdit(index, empresa)} style={{ fontSize: 22, cursor: 'pointer', color: '#070ff7' }} />
                                    <BiTrash onClick={() => handleDelete(index)} style={{ fontSize: 22, cursor: 'pointer', color: '#b51010' }} />
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </>
    );
};
