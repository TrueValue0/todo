import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ModalBorrar(props) {
    const { onHide, borrar } = props;
    const eliminar = () => {
        borrar();
        onHide();
    }
    return (
        <Modal
            {...props}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title className='text-danger'>
                    Borrado
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>¿Está seguro de eliminar el evento?</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Cerrar</Button>
                <Button variant='danger' onClick={eliminar} >Borrar</Button>
            </Modal.Footer>
        </Modal>
    );
}