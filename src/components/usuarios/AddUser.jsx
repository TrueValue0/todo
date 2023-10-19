import { generarPassword } from '@/services/generarUUID';
import { useEffect, useState } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Snippet from '@/components/Snippet';
import { useAuth } from '@/context/AuthProvider';
import { setDoc, doc } from 'firebase/firestore'
import { db } from '@/config/firebaseapp'
import { useAlert } from '@/hooks/useAlert';

export default function AddUser({ volver }) {

    const { signup, setCreatingUser } = useAuth();
    const { alert, confirmacion, error } = useAlert();

    const userInitial = {
        nombre: '',
        apellidos: '',
        email: '',
        password: '',
        rol: 'user',
        avatar: 'https://cdn-icons-png.flaticon.com/512/6386/6386976.png'
    }

    const [user, setUser] = useState(userInitial)

    const [passwordOptions, setPasswordOptions] = useState({
        longitud: 16,
        numeros: false,
        especiales: false,
    })

    const handleFileChange = (e) => {
        console.log(e.target.files)
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                setUser(prev => ({ ...prev, avatar: event.target.result }));
            }

            reader.readAsDataURL(file);
        }
    };

    const guardar = async () => {
        const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailValidator.test(user.email)) {
            const registrado = await signup(user.email, user.password);
            delete user.password;
            await setDoc(doc(db, 'usuarios', registrado.user.uid), user);
            await setDoc(doc(db, 'tareas', registrado.user.uid), { usuario: user.nombre, tareas: [] });
            confirmacion('¡Usuario creado correctamente!');
            setUser(userInitial);
        } else {
            error('Correo invalido.');
        }
    }

    useEffect(() => {
        setUser(prev => ({ ...prev, password: generarPassword(passwordOptions) }))
    }, [passwordOptions])

    return (
        <>
            <Form /* className='w-100' */>
                <Row>
                    <Button className='w-auto d-inline-block mx-4 mx-sm-0' onClick={volver}>Volver</Button>
                    <h2 className='text-center mb-2 w-auto m-auto'>Añadir Usuario</h2>
                </Row>

                <Row>
                    <Col>
                        <div className='d-flex justify-content-center align-items-center my-2'>
                            <Image rounded width={100} src={user.avatar} className='mx-auto' />
                        </div>
                    </Col>
                    <Form.Group as={Col} className='d-flex align-items-center'>
                        <Form.Label>Avatar: </Form.Label>
                        <Form.Control size='sm' className='w-auto d-inline-block ms-2' onChange={handleFileChange} accept='image/*' type='file' />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} className='mt-3'>
                        <FloatingLabel style={{ minWidth: 245 }} label='Nombre'>
                            <Form.Control
                                placeholder=' '
                                value={user.nombre}
                                onChange={(e) => setUser(prev => ({ ...prev, nombre: e.target.value }))}
                            />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group as={Col} className='mt-3'>
                        <FloatingLabel style={{ minWidth: 245 }} label='Apellidos'>
                            <Form.Control
                                placeholder=' '
                                value={user.apellidos}
                                onChange={(e) => setUser(prev => ({ ...prev, apellidos: e.target.value }))}
                            />
                        </FloatingLabel>
                    </Form.Group>
                </Row>

                <Row className='justify-content-between align-items-center p-2'>
                    <Form.Group as={Col} className='mt-3'>
                        <FloatingLabel style={{ minWidth: 245 }} label='Email'>
                            <Form.Control
                                placeholder=' '
                                value={user.email}
                                onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group as={Col} className='mt-3'>
                        <Form.Label className='w-auto m-0 me-2 p-0'>Rol:</Form.Label>
                        <Form.Select value={user.rol} onChange={e => setUser(prev => ({ ...prev, rol: e.target.value }))} style={{ minWidth: 250 }} className='d-inline w-auto'>
                            <option value='user'>Usuario</option>
                            <option value='admin'>Administrador</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} className='my-2 my-sm-0'>
                        <h6 className='my-1 '>Contraseña autogenerada :</h6>
                        <Snippet content={user.password} />
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="numeros"
                            value={passwordOptions.numeros}
                            onChange={(e) => setPasswordOptions(prev => ({ ...prev, numeros: e.target.checked }))}
                        />
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Caracteres especiales"
                            value={passwordOptions.especiales}
                            onChange={(e) => setPasswordOptions(prev => ({ ...prev, especiales: e.target.checked }))}
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Button className='w-auto m-auto' onClick={guardar}>Añadir</Button>
                </Row>
                {alert.show && <Alert className="position-absolute bottom-0 start-50 translate-middle-x" variant={alert.variant} dismissible>{alert.message}</Alert>}
            </Form>
        </>
    )
}