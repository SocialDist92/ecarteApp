import React, {useState} from 'react';
import {Table, Form, Button, Modal} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faCartPlus} from '@fortawesome/free-solid-svg-icons'
import AddToStudent from './addToStudent';

const ListCourses = ({students}) => {
    const [show, setShow] = useState(false)
    const [filteredStudents, setFilteredStudents] = useState(students ? [...students] : [])

    React.useEffect(() => {
        setFilteredStudents(students)
    }, [students])

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setFilteredStudents(students.filter(student => {
            const completeName = student.name.toLowerCase() + ' ' + student.lastName.toLowerCase();
            return completeName.includes(searchTerm)
        }))

    }
    return (
        <section>

            <Form.Group>
                <Form.Control type="text" onChange={handleSearch.bind(this)} placeholder="Buscar"/>
            </Form.Group>

            <Table striped bordered hover>
                <thead>
                <tr>

                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Opciones</th>
                </tr>
                </thead>
                <tbody>
                {
                    filteredStudents ? filteredStudents.map(student => {
                            return (
                                <tr key={student._id}>

                                    <td>{student.name}</td>
                                    <td>{student.lastName}</td>
                                    <td>

                                        <Button onClick={handleShow} className="mr-2"><FontAwesomeIcon
                                            icon={faCartPlus}/></Button>
                                        <Button variant="danger"><FontAwesomeIcon icon={faTrash}/></Button>

                                    </td>
                                </tr>
                            )
                        }) : null
                }
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Inscribir</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddToStudent/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>


        </section>
    )
}

export default ListCourses;