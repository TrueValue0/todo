import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './modal.css'

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
            contentClassName="content-delete"
            dialogClassName="justify-content-center"
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
                <Button variant='danger' onClick={eliminar}>Si</Button>
                <Button onClick={onHide}>No</Button>
            </Modal.Footer>
        </Modal>
    );
}